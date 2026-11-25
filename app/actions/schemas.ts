import { z } from "zod";

export const contactSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters"),
  lastName: z.string().trim().min(2, "Last name must be at least 2 characters"),
  email: z.email("Please enter a valid email address").trim(),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters long"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const contactSubmissionSchema = contactSchema.extend({
  website: z.string().optional().default(""),
  elapsedMs: z.number().int().nonnegative().optional(),
  captchaToken: z.string().optional(),
});

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;

export type ContactActionResult =
  | { success: true }
  | { success: false; error: string; requiresCaptcha?: boolean };

export const FEEDBACK_MAX_FILES = 5;
/** All attachments together, under the 4 MB a request may carry once the text is added. */
export const FEEDBACK_MAX_TOTAL_BYTES = 3.5 * 1024 * 1024;
export const FEEDBACK_FILE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/heic", "image/heif", "application/pdf", "text/plain"];

export const feedbackSchema = z.object({
  name: z.string().trim().max(80, "Name must be at most 80 characters"),
  email: z.union([z.literal(""), z.email("Please enter a valid email address").trim()]),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters long")
    .max(5000, "Message must be at most 5000 characters long"),
});

export type FeedbackFormData = z.infer<typeof feedbackSchema>;

export const feedbackSubmissionSchema = feedbackSchema.extend({
  app: z.string(),
  website: z.string().optional().default(""),
  elapsedMs: z.coerce.number().int().nonnegative().optional(),
  captchaToken: z.string().optional(),
});
