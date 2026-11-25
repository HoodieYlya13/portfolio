"use server";

import { Resend } from "resend";
import {
  FEEDBACK_FILE_TYPES,
  FEEDBACK_MAX_FILES,
  FEEDBACK_MAX_TOTAL_BYTES,
  feedbackSubmissionSchema,
  type ContactActionResult,
} from "./schemas";
import { escapeHtml } from "@/lib/escape-html";
import { feedbackRecipient, findFeedbackApp, type FeedbackApp } from "@/lib/feedback-apps";
import { guardAgainstSpam } from "@/lib/spam-guard";
import { tryCatch } from "@/lib/utils";

const resend = new Resend(process.env.RESEND_API_KEY);

type Attachment = { filename: string; content: Buffer };

/** Feedback about one of the apps (see lib/feedback-apps.ts), with optional photos or files. */
export async function sendFeedback(formData: FormData): Promise<ContactActionResult> {
  const fields = feedbackSubmissionSchema.safeParse({
    app: formData.get("app"),
    name: formData.get("name") ?? "",
    email: formData.get("email") ?? "",
    message: formData.get("message"),
    website: formData.get("website") ?? "",
    elapsedMs: formData.get("elapsedMs") ?? undefined,
    captchaToken: formData.get("captchaToken") || undefined,
  });
  const app = fields.success ? findFeedbackApp(fields.data.app) : null;
  if (!fields.success || !app)
    return { success: false, error: "Invalid form submission data. Please check your inputs." };

  const { name, email, message, website, elapsedMs, captchaToken } = fields.data;
  if (website.trim().length > 0) return { success: true };

  const files = formData.getAll("files").filter((value): value is File => value instanceof File && value.size > 0);
  const filesProblem = attachmentsProblem(files);
  if (filesProblem) return { success: false, error: filesProblem };

  const rejection = await guardAgainstSpam({
    form: "feedback",
    elapsedMs,
    captchaToken,
    rateLimitMessage: "Too many requests. Please slow down (max 2 messages/min).",
  });
  if (rejection) return rejection;

  const attachments = await Promise.all(files.map(toAttachment));

  if (process.env.NODE_ENV !== "production") {
    console.log(`\n📝 ${app.name} feedback from ${name || "(no name)"} <${email || "no email"}>\n${message}\nFiles: ${attachments.map((a) => a.filename).join(", ") || "none"}\n`);
    return { success: true };
  }

  const [error, result] = await tryCatch(
    resend.emails.send({
      from: "Portfolio Website <contact@noreply.hy13dev.com>",
      to: feedbackRecipient(app.id),
      ...(email ? { replyTo: email } : {}),
      subject: `${app.name} feedback${name ? ` from ${name}` : ""}`,
      html: feedbackHtml(app, { name, email, message, fileNames: attachments.map((a) => a.filename) }),
      attachments,
    }),
  );
  if (error || result?.error) {
    console.error("Feedback email sending failed:", error ?? result?.error);
    return { success: false, error: "Internal server error. Please try again later." };
  }
  return { success: true };
}

function attachmentsProblem(files: File[]): string | null {
  if (files.length > FEEDBACK_MAX_FILES) return `At most ${FEEDBACK_MAX_FILES} files.`;
  if (files.some((file) => !FEEDBACK_FILE_TYPES.includes(file.type))) return "Only photos, PDFs and text files can be attached.";
  const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
  if (totalBytes > FEEDBACK_MAX_TOTAL_BYTES) return "The files are too big together (3.5 MB at most).";
  return null;
}

async function toAttachment(file: File): Promise<Attachment> {
  // Only the name's last part: no paths, nothing that could pass for a header.
  const filename = file.name.split(/[\\/]/).pop()?.replace(/[^\w.\- ]/g, "_").slice(0, 100) || "attachment";
  return { filename, content: Buffer.from(await file.arrayBuffer()) };
}

function feedbackHtml(app: FeedbackApp, feedback: { name: string; email: string; message: string; fileNames: string[] }): string {
  const from = feedback.name ? escapeHtml(feedback.name) : "Someone";
  const contact = feedback.email
    ? `<a href="mailto:${escapeHtml(feedback.email)}" style="color:#0265DC;text-decoration:none">${escapeHtml(feedback.email)}</a>`
    : "No email given";
  const files = feedback.fileNames.length
    ? `<p style="font-size:13px;color:#475569;margin:16px 0 0">Attached: ${feedback.fileNames.map(escapeHtml).join(", ")}</p>`
    : "";
  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;max-width:580px;margin:0 auto;padding:32px 24px;color:#0F172A">
    <p style="font-size:12px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:#D97706;margin:0 0 8px">${escapeHtml(app.name)} feedback</p>
    <h1 style="font-size:20px;margin:0 0 4px">${from}</h1>
    <p style="font-size:14px;color:#475569;margin:0 0 24px">${contact}</p>
    <div style="background:#F8FAFC;border-left:4px solid #D97706;border-radius:4px;padding:16px 20px">
      <p style="margin:0;font-size:15px;line-height:1.6;white-space:pre-wrap">${escapeHtml(feedback.message)}</p>
    </div>
    ${files}
  </div>`;
}
