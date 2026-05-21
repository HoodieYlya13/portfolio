// TODO: style this

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";
import { sendContactEmail } from "@/app/actions/contact";
import { contactSchema, type ContactFormData } from "@/app/actions/schemas";

export function ContactForm() {
  const [serverStatus, setServerStatus] = useState<{
    type: "success" | "error" | null;
    message: string | null;
  }>({ type: null, message: null });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setServerStatus({ type: null, message: null });

    const result = await sendContactEmail(data);

    if (result.success) {
      setServerStatus({
        type: "success",
        message:
          "Message sent successfully! I'll get back to you as soon as possible. ✅",
      });
      reset();
    } else {
      setServerStatus({
        type: "error",
        message: result.error || "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="w-full max-w-xl bg-neutral-900/40 backdrop-blur-xl border border-neutral-800/80 p-8 rounded-2xl shadow-2xl transition-all duration-300 hover:border-neutral-700/50">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-neutral-100 tracking-tight">
          Get in Touch
        </h2>
        <p className="text-sm text-neutral-400 mt-1">
          Have an opportunity or a question? Drop me a line directly.
        </p>
      </div>

      {serverStatus.type && (
        <div
          className={`mb-6 p-4 rounded-xl flex items-start gap-3 border text-sm transition-all duration-300 ${
            serverStatus.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
              : "bg-rose-500/10 border-rose-500/20 text-rose-400"
          }`}
        >
          {serverStatus.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          )}
          <p>{serverStatus.message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold tracking-wide text-neutral-400 uppercase">
              First Name
            </label>
            <input
              {...register("firstName")}
              type="text"
              disabled={isSubmitting}
              className="w-full bg-neutral-950/50 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-hidden focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              placeholder="John"
            />
            {errors.firstName && (
              <span className="text-xs text-rose-400 font-medium pl-1">
                {errors.firstName.message}
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold tracking-wide text-neutral-400 uppercase">
              Last Name
            </label>
            <input
              {...register("lastName")}
              type="text"
              disabled={isSubmitting}
              className="w-full bg-neutral-950/50 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-hidden focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              placeholder="Doe"
            />
            {errors.lastName && (
              <span className="text-xs text-rose-400 font-medium pl-1">
                {errors.lastName.message}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold tracking-wide text-neutral-400 uppercase">
            Email Address
          </label>
          <input
            {...register("email")}
            type="email"
            disabled={isSubmitting}
            className="w-full bg-neutral-950/50 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-100 placeholder-neutral-600 focus:outline-hidden focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            placeholder="johndoe@example.com"
          />
          {errors.email && (
            <span className="text-xs text-rose-400 font-medium pl-1">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold tracking-wide text-neutral-400 uppercase">
            Message
          </label>
          <textarea
            {...register("message")}
            rows={5}
            disabled={isSubmitting}
            className="w-full bg-neutral-950/50 border border-neutral-800 rounded-xl p-4 text-sm text-neutral-100 placeholder-neutral-600 resize-none focus:outline-hidden focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            placeholder="Tell me about your project stack requirements..."
          />
          {errors.message && (
            <span className="text-xs text-rose-400 font-medium pl-1">
              {errors.message.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full font-semibold text-sm bg-neutral-100 text-neutral-950 h-12 rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-200 focus:outline-hidden focus:ring-2 focus:ring-neutral-400/50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-neutral-800" />
              <span>Transmitting Security Payload...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 text-neutral-800" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
