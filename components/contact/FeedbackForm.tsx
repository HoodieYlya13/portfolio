"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Paperclip, Send, X } from "lucide-react";
import { toast } from "sonner";
import { gsap } from "gsap";
import { sendFeedback } from "@/app/actions/feedback";
import {
  FEEDBACK_FILE_TYPES,
  FEEDBACK_MAX_FILES,
  FEEDBACK_MAX_TOTAL_BYTES,
  feedbackSchema,
  type FeedbackFormData,
} from "@/app/actions/schemas";
import SplitText from "@/components/react-bits/SplitText";
import { Turnstile } from "@/components/contact/Turnstile";
import { FIELD_ERROR, FIELD_INPUT, FIELD_LABEL, FIELD_TEXTAREA, FORM_CARD, SUBMIT_BUTTON } from "@/components/contact/field-styles";
import type { FeedbackApp } from "@/lib/feedback-apps";
import { shrinkImage } from "@/lib/shrink-image";
import { tryCatch } from "@/lib/utils";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

function formatSize(bytes: number): string {
  return bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Feedback about one of my apps, reached through /contact?app=<id>: a message, and photos or files if useful. */
export function FeedbackForm({ app }: { app: FeedbackApp }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const renderedAtRef = useRef<number>(0);

  const [files, setFiles] = useState<File[]>([]);
  const [isPreparingFiles, setIsPreparingFiles] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  useEffect(() => {
    renderedAtRef.current = Date.now();
    if (containerRef.current)
      gsap.fromTo(containerRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.1 });
  }, []);

  const totalBytes = files.reduce((sum, file) => sum + file.size, 0);

  async function addFiles(picked: FileList | null) {
    if (!picked?.length) return;
    setIsPreparingFiles(true);
    const accepted = Array.from(picked).filter((file) => FEEDBACK_FILE_TYPES.includes(file.type) || file.type.startsWith("image/"));
    const shrunk = await Promise.all(accepted.map(shrinkImage));
    const next = [...files, ...shrunk].slice(0, FEEDBACK_MAX_FILES);
    setIsPreparingFiles(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (accepted.length < picked.length) toast.error("Only photos, PDFs and text files can be attached.");
    if (files.length + shrunk.length > FEEDBACK_MAX_FILES) toast.error(`At most ${FEEDBACK_MAX_FILES} files.`);
    if (next.reduce((sum, file) => sum + file.size, 0) > FEEDBACK_MAX_TOTAL_BYTES) {
      toast.error("These files are too big together (3.5 MB at most).");
      return;
    }
    setFiles(next);
  }

  const handleVerify = useCallback((token: string) => setCaptchaToken(token), []);
  const handleExpire = useCallback(() => setCaptchaToken(null), []);

  async function submit(data: FeedbackFormData, website: string, elapsedMs: number) {
    const formData = new FormData();
    formData.set("app", app.id);
    formData.set("name", data.name);
    formData.set("email", data.email);
    formData.set("message", data.message);
    formData.set("website", website);
    formData.set("elapsedMs", String(elapsedMs));
    if (captchaToken) formData.set("captchaToken", captchaToken);
    files.forEach((file) => formData.append("files", file));

    const toastId = toast.loading("Sending your feedback...");
    const [error, result] = await tryCatch(sendFeedback(formData));
    if (error || !result) {
      toast.error("Internal server error. Please try again later.", { id: toastId });
      return;
    }
    if (result.success) {
      toast.success("Thanks for your feedback!", { id: toastId });
      reset();
      setFiles([]);
      setShowCaptcha(false);
      setCaptchaToken(null);
      return;
    }
    if (result.requiresCaptcha) {
      setShowCaptcha(true);
      setCaptchaToken(null);
    }
    toast.error(result.error || "Something went wrong. Please try again.", { id: toastId });
  }

  const isBusy = isSubmitting || isPreparingFiles;
  const awaitingCaptcha = showCaptcha && !captchaToken;

  return (
    <div ref={containerRef} className={FORM_CARD}>
      <div className="mb-6">
        <SplitText
          text={`${app.name} feedback`}
          className="text-2xl font-bold text-foreground tracking-tight"
          delay={35}
          duration={0.7}
          ease="power3.out"
          tag="h2"
          immediate
        />
        <p className="text-sm text-muted-foreground mt-1.5">
          Found a bug or have an idea? Tell me about it, screenshots welcome.
        </p>
      </div>

      <form
        onSubmit={(event) => {
          // The fields themselves, not the form state: autofill can fill them without a change event.
          const form = new FormData(event.currentTarget);
          (["name", "email", "message"] as const).forEach((field) => setValue(field, String(form.get(field) ?? "")));
          const website = honeypotRef.current?.value ?? "";
          const elapsedMs = Date.now() - renderedAtRef.current;
          void handleSubmit((data) => submit(data, website, elapsedMs))(event);
        }}
        className="space-y-5"
      >
        <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: 0, width: 1, height: 1, overflow: "hidden" }}>
          <label htmlFor="website">Website (leave this empty)</label>
          <input ref={honeypotRef} id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="feedback-name" className={FIELD_LABEL}>
              Name (optional)
            </label>
            <input id="feedback-name" {...register("name")} type="text" autoComplete="name" disabled={isBusy} className={FIELD_INPUT} placeholder="John" />
            {errors.name && <span className={FIELD_ERROR}>{errors.name.message}</span>}
          </div>
          <div className="space-y-1.5">
            <label htmlFor="feedback-email" className={FIELD_LABEL}>
              Email (optional)
            </label>
            <input id="feedback-email" {...register("email")} type="email" autoComplete="email" disabled={isBusy} className={FIELD_INPUT} placeholder="To get a reply" />
            {errors.email && <span className={FIELD_ERROR}>{errors.email.message}</span>}
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="feedback-message" className={FIELD_LABEL}>
            Message
          </label>
          <textarea
            id="feedback-message"
            {...register("message")}
            rows={5}
            autoComplete="off"
            disabled={isBusy}
            className={FIELD_TEXTAREA}
            placeholder="What happened, or what would you like?"
          />
          {errors.message && <span className={FIELD_ERROR}>{errors.message.message}</span>}
        </div>

        <div className="space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,application/pdf,text/plain"
            className="hidden"
            onChange={(event) => void addFiles(event.target.files)}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isBusy || files.length >= FEEDBACK_MAX_FILES}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isPreparingFiles ? <Loader2 className="size-4 animate-spin" /> : <Paperclip className="size-4" />}
            Add photos or files
          </button>
          {files.length > 0 && (
            <ul className="space-y-1.5">
              {files.map((file, index) => (
                <li key={`${file.name}-${index}`} className="flex items-center justify-between gap-3 rounded-lg border border-border/60 px-3 py-2 text-sm">
                  <span className="min-w-0 truncate">{file.name}</span>
                  <span className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
                    {formatSize(file.size)}
                    <button
                      type="button"
                      onClick={() => setFiles(files.filter((_, i) => i !== index))}
                      disabled={isBusy}
                      aria-label={`Remove ${file.name}`}
                      className="cursor-pointer hover:text-foreground"
                    >
                      <X className="size-4" />
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          )}
          <p className="text-xs text-muted-foreground">
            Up to {FEEDBACK_MAX_FILES} files, {formatSize(FEEDBACK_MAX_TOTAL_BYTES)} in all{files.length > 0 ? ` (${formatSize(totalBytes)} used)` : ""}.
            Photos are resized before sending.
          </p>
        </div>

        {showCaptcha && TURNSTILE_SITE_KEY && (
          <div className="space-y-2 animate-fadeIn">
            <p className="text-xs text-muted-foreground">Quick check to confirm you&apos;re human, then hit send again.</p>
            <Turnstile siteKey={TURNSTILE_SITE_KEY} onVerify={handleVerify} onExpire={handleExpire} />
          </div>
        )}

        <button type="submit" disabled={isBusy || awaitingCaptcha} className={SUBMIT_BUTTON}>
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-primary-foreground" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 text-primary-foreground" />
              <span>Send feedback</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
