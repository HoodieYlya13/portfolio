"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { gsap } from "gsap";
import { sendContactEmail } from "@/app/actions/contact";
import { contactSchema, type ContactFormData } from "@/app/actions/schemas";
import SplitText from "@/components/react-bits/SplitText";
import { Turnstile } from "@/components/contact/Turnstile";
import { tryCatch } from "@/lib/utils";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function ContactForm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const renderedAtRef = useRef<number>(0);

  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    renderedAtRef.current = Date.now();

    if (containerRef.current)
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.1 },
      );
  }, []);

  const handleVerify = useCallback(
    (token: string) => setCaptchaToken(token),
    [],
  );
  const handleExpire = useCallback(() => setCaptchaToken(null), []);

  const onSubmit = useCallback(
    async (data: ContactFormData, company: string, elapsedMs: number) => {
      const toastId = toast.loading("Transmitting message payload...");

      const [error, result] = await tryCatch(
        sendContactEmail({
          ...data,
          company,
          elapsedMs,
          captchaToken: captchaToken ?? undefined,
        }),
      );

      if (error)
        toast.error("Internal server error. Please try again later.", {
          id: toastId,
        });
      else if (result) {
        if (result.success) {
          toast.success(
            "Message sent successfully! I'll get back to you soon.",
            { id: toastId },
          );
          reset();
          setShowCaptcha(false);
          setCaptchaToken(null);
        } else if (result.requiresCaptcha) {
          setShowCaptcha(true);
          setCaptchaToken(null);
          toast.error(
            result.error || "Please complete the verification below.",
            { id: toastId },
          );
        } else
          toast.error(
            result.error || "Something went wrong. Please try again.",
            { id: toastId },
          );
      }
    },
    [captchaToken, reset],
  );

  const awaitingCaptcha = showCaptcha && !captchaToken;

  return (
    <div
      ref={containerRef}
      className="w-full max-w-xl bg-card/75 dark:bg-card/75 backdrop-blur-md border border-border/80 dark:border-border/40 p-8 rounded-2xl shadow-xl transition-all duration-300 hover:border-primary/40 dark:hover:border-primary/30 opacity-0"
    >
      <div className="mb-6">
        <SplitText
          text="Get in Touch"
          className="text-2xl font-bold text-foreground tracking-tight"
          delay={35}
          duration={0.7}
          ease="power3.out"
          tag="h2"
          immediate
        />
        <p className="text-sm text-muted-foreground mt-1.5">
          Have an opportunity or a question? Drop me a line directly.
        </p>
      </div>

      <form
        onSubmit={(event) => {
          const company = honeypotRef.current?.value ?? "";
          const elapsedMs = Date.now() - renderedAtRef.current;
          void handleSubmit((data) => onSubmit(data, company, elapsedMs))(
            event,
          );
        }}
        className="space-y-5"
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-9999px",
            top: 0,
            width: 1,
            height: 1,
            overflow: "hidden",
          }}
        >
          <label htmlFor="company">Company (leave this empty)</label>
          <input
            ref={honeypotRef}
            id="company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              First Name
            </label>
            <input
              {...register("firstName")}
              type="text"
              disabled={isSubmitting}
              className="w-full bg-background/70 dark:bg-black/40 border border-border/80 dark:border-border/45 rounded-xl px-4 py-3 text-[1rem] md:text-sm text-foreground placeholder-muted-foreground/60 focus:outline-hidden focus:border-primary/80 focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              placeholder="John"
            />
            {errors.firstName && (
              <span className="text-xs text-destructive font-medium pl-1 animate-fadeIn">
                {errors.firstName.message}
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Last Name
            </label>
            <input
              {...register("lastName")}
              type="text"
              disabled={isSubmitting}
              className="w-full bg-background/70 dark:bg-black/40 border border-border/80 dark:border-border/45 rounded-xl px-4 py-3 text-[1rem] md:text-sm text-foreground placeholder-muted-foreground/60 focus:outline-hidden focus:border-primary/80 focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              placeholder="Doe"
            />
            {errors.lastName && (
              <span className="text-xs text-destructive font-medium pl-1 animate-fadeIn">
                {errors.lastName.message}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Email Address
          </label>
          <input
            {...register("email")}
            type="email"
            disabled={isSubmitting}
            className="w-full bg-background/70 dark:bg-black/40 border border-border/80 dark:border-border/45 rounded-xl px-4 py-3 text-[1rem] md:text-sm text-foreground placeholder-muted-foreground/60 focus:outline-hidden focus:border-primary/80 focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            placeholder="johndoe@example.com"
          />
          {errors.email && (
            <span className="text-xs text-destructive font-medium pl-1 animate-fadeIn">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Message
          </label>
          <textarea
            {...register("message")}
            rows={5}
            disabled={isSubmitting}
            className="w-full bg-background/70 dark:bg-black/40 border border-border/80 dark:border-border/45 rounded-xl p-4 text-[1rem] md:text-sm text-foreground placeholder-muted-foreground/60 resize-none focus:outline-hidden focus:border-primary/80 focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            placeholder="Tell me about your project stack requirements..."
          />
          {errors.message && (
            <span className="text-xs text-destructive font-medium pl-1 animate-fadeIn">
              {errors.message.message}
            </span>
          )}
        </div>

        {showCaptcha && TURNSTILE_SITE_KEY && (
          <div className="space-y-2 animate-fadeIn">
            <p className="text-xs text-muted-foreground">
              Quick check to confirm you&apos;re human, then hit send again.
            </p>
            <Turnstile
              siteKey={TURNSTILE_SITE_KEY}
              onVerify={handleVerify}
              onExpire={handleExpire}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || awaitingCaptcha}
          className="w-full font-semibold text-sm bg-primary hover:bg-primary/95 text-primary-foreground h-12 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] focus:outline-hidden focus:ring-2 focus:ring-primary/30 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-primary-foreground" />
              <span>Transmitting Security Payload...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 text-primary-foreground" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
