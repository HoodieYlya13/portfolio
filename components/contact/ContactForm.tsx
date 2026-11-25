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
import { FIELD_ERROR, FIELD_INPUT, FIELD_LABEL, FIELD_TEXTAREA, FORM_CARD, SUBMIT_BUTTON } from "@/components/contact/field-styles";

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
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { firstName: "", lastName: "", email: "", message: "" },
  });

  const syncDomValues = useCallback(
    (form: HTMLFormElement) => {
      (["firstName", "lastName", "email", "message"] as const).forEach(
        (name) => {
          const field = form.elements.namedItem(name);
          if (
            field instanceof HTMLInputElement ||
            field instanceof HTMLTextAreaElement
          )
            setValue(name, field.value);
        },
      );
    },
    [setValue],
  );

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
    async (data: ContactFormData, website: string, elapsedMs: number) => {
      const toastId = toast.loading("Transmitting message payload...");

      const [error, result] = await tryCatch(
        sendContactEmail({
          ...data,
          website,
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
      className={FORM_CARD}
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
          syncDomValues(event.currentTarget);
          const website = honeypotRef.current?.value ?? "";
          const elapsedMs = Date.now() - renderedAtRef.current;
          void handleSubmit((data) => onSubmit(data, website, elapsedMs))(
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
          <label htmlFor="website">Website (leave this empty)</label>
          <input
            ref={honeypotRef}
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className={FIELD_LABEL}>
              First Name
            </label>
            <input
              {...register("firstName")}
              type="text"
              autoComplete="given-name"
              disabled={isSubmitting}
              className={FIELD_INPUT}
              placeholder="John"
            />
            {errors.firstName && (
              <span className={FIELD_ERROR}>
                {errors.firstName.message}
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <label className={FIELD_LABEL}>
              Last Name
            </label>
            <input
              {...register("lastName")}
              type="text"
              autoComplete="family-name"
              disabled={isSubmitting}
              className={FIELD_INPUT}
              placeholder="Doe"
            />
            {errors.lastName && (
              <span className={FIELD_ERROR}>
                {errors.lastName.message}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className={FIELD_LABEL}>
            Email Address
          </label>
          <input
            {...register("email")}
            type="email"
            autoComplete="email"
            disabled={isSubmitting}
            className={FIELD_INPUT}
            placeholder="johndoe@example.com"
          />
          {errors.email && (
            <span className={FIELD_ERROR}>
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="space-y-1.5">
          <label className={FIELD_LABEL}>
            Message
          </label>
          <textarea
            {...register("message")}
            rows={5}
            autoComplete="off"
            disabled={isSubmitting}
            className={FIELD_TEXTAREA}
            placeholder="Tell me about your project stack requirements..."
          />
          {errors.message && (
            <span className={FIELD_ERROR}>
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
          className={SUBMIT_BUTTON}
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
