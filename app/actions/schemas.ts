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
  company: z.string().optional().default(""),
  elapsedMs: z.number().int().nonnegative().optional(),
  captchaToken: z.string().optional(),
});

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;

export type ContactActionResult =
  | { success: true }
  | { success: false; error: string; requiresCaptcha?: boolean };
