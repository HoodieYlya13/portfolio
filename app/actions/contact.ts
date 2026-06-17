"use server";

import { Resend } from "resend";
import {
  contactSubmissionSchema,
  type ContactSubmission,
  type ContactActionResult,
} from "./schemas";
import {
  checkRateLimit,
  isRepeatSubmission,
  RateLimitError,
} from "@/lib/ratelimit";
import { isCaptchaEnabled, verifyTurnstileToken } from "@/lib/turnstile";
import { tryCatch } from "@/lib/utils";

const resend = new Resend(process.env.RESEND_API_KEY);

const MIN_HUMAN_FILL_MS = 3000;

export async function sendContactEmail(
  data: ContactSubmission,
): Promise<ContactActionResult> {
  const validatedFields = contactSubmissionSchema.safeParse(data);

  if (!validatedFields.success)
    return {
      success: false,
      error: "Invalid form submission data. Please check your inputs.",
    };

  const {
    firstName,
    lastName,
    email,
    message,
    company,
    elapsedMs,
    captchaToken,
  } = validatedFields.data;

  if (company.trim().length > 0) return { success: true };

  const [error] = await tryCatch(checkRateLimit("contact"));
  if (error) {
    if (error instanceof RateLimitError)
      return {
        success: false,
        error: "Too many requests. Please slow down (max 2 messages/min).",
      };
    throw error;
  }

  if (isCaptchaEnabled()) {
    const tooFast = elapsedMs === undefined || elapsedMs < MIN_HUMAN_FILL_MS;
    const [, repeat] = await tryCatch(isRepeatSubmission("contact"));
    const suspect = tooFast || repeat === true;

    if (suspect) {
      if (!captchaToken)
        return {
          success: false,
          requiresCaptcha: true,
          error: "Please complete the verification to continue.",
        };

      const [verifyError, valid] = await tryCatch(
        verifyTurnstileToken(captchaToken),
      );

      if (verifyError || !valid)
        return {
          success: false,
          requiresCaptcha: true,
          error: "Verification failed. Please try again.",
        };
    }
  }

  if (process.env.NODE_ENV !== "production") {
    console.log(
      "\n=================== 📝 LOCAL CONTACT FORM SUBMISSION ===================",
    );
    console.log(`From: ${firstName} ${lastName} <${email}>`);
    console.log(`Message: ${message}`);
    console.log(
      "========================================================================\n",
    );

    return { success: true };
  }

  const currentYear = new Date().getFullYear();

  const adminHtml = `
    <div style="background-color: #020D19; padding: 40px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; min-height: 100%;">
      <div style="max-width: 580px; margin: 0 auto; background-color: #FFFCFC; border-radius: 12px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3); overflow: hidden; border: 1px solid #3A3A3C;">
        
        <!-- Top Accent Gradient Bar -->
        <div style="height: 6px; background: linear-gradient(90deg, #FF9500 0%, #007AFF 100%);"></div>
        
        <!-- Header -->
        <div style="padding: 32px 32px 24px 32px; border-bottom: 1px solid #E5E5EA;">
          <span style="font-size: 12px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: #FF9500; display: inline-block; margin-bottom: 8px;">Portfolio Notification</span>
          <h1 style="font-size: 20px; font-weight: 700; color: #020D19; margin: 0;">New Message Received</h1>
          <p style="font-size: 14px; color: #8E8E93; margin: 6px 0 0 0;">You have received a new inquiry from your website's contact form.</p>
        </div>
        
        <!-- Body Content -->
        <div style="padding: 32px;">
          
          <!-- Sender Details -->
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 0; width: 25%; font-size: 14px; font-weight: 600; color: #8E8E93; vertical-align: top;">From:</td>
              <td style="padding: 8px 0; font-size: 14px; color: #020D19; vertical-align: top;">
                <strong style="color: #020D19;">${firstName} ${lastName}</strong>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #8E8E93; vertical-align: top;">Email:</td>
              <td style="padding: 8px 0; font-size: 14px; color: #007AFF; vertical-align: top;">
                <a href="mailto:${email}" style="color: #007AFF; text-decoration: none; font-weight: 500;">${email}</a>
              </td>
            </tr>
          </table>
          
          <!-- Message Box -->
          <div style="margin-top: 16px; margin-bottom: 32px;">
            <p style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #8E8E93; margin: 0 0 10px 0;">Message Content</p>
            <div style="background-color: #E5E5EA; border-left: 4px solid #FF9500; border-radius: 4px; padding: 20px; border-top: 1px solid #E5E5EA; border-right: 1px solid #E5E5EA; border-bottom: 1px solid #E5E5EA;">
              <p style="margin: 0; font-size: 15px; color: #020D19; line-height: 1.6; white-space: pre-wrap; font-style: italic;">"${message}"</p>
            </div>
          </div>
          
          <!-- Action Button -->
          <div style="text-align: center; margin-top: 32px; margin-bottom: 16px;">
            <a href="mailto:${email}?subject=Re:%20Your%20portfolio%20message" style="background-color: #FF9500; color: #FFFCFC; padding: 12px 28px; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 6px; display: inline-block; box-shadow: 0 2px 4px rgba(255, 149, 0, 0.2);">
              Reply Directly
            </a>
          </div>
          
        </div>
        
        <!-- Footer -->
        <div style="background-color: #E5E5EA; padding: 24px 32px; text-align: center; border-top: 1px solid #E5E5EA;">
          <p style="font-size: 12px; color: #8E8E93; margin: 0;">This is an automated notification from your portfolio website's contact action.</p>
          <p style="font-size: 11px; color: #8E8E93; margin: 4px 0 0 0;">&copy; ${currentYear} hy13dev. All rights reserved.</p>
        </div>
        
      </div>
    </div>
  `;

  const visitorHtml = `
    <div style="background-color: #020D19; padding: 40px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; min-height: 100%;">
      <div style="max-width: 580px; margin: 0 auto; background-color: #FFFCFC; border-radius: 12px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3); overflow: hidden; border: 1px solid #3A3A3C;">
        
        <!-- Top Accent Gradient Bar -->
        <div style="height: 6px; background: linear-gradient(90deg, #34C759 0%, #007AFF 100%);"></div>
        
        <!-- Header -->
        <div style="padding: 32px 32px 24px 32px; border-bottom: 1px solid #E5E5EA;">
          <span style="font-size: 12px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: #34C759; display: inline-block; margin-bottom: 8px;">Message Confirmation</span>
          <h1 style="font-size: 20px; font-weight: 700; color: #020D19; margin: 0;">Thanks for reaching out!</h1>
          <p style="font-size: 14px; color: #8E8E93; margin: 6px 0 0 0;">Hi ${firstName}, I've received your message and will get back to you shortly.</p>
        </div>
        
        <!-- Body Content -->
        <div style="padding: 32px;">
          
          <p style="font-size: 15px; color: #020D19; line-height: 1.6; margin: 0 0 24px 0;">
            Thank you for visiting my portfolio and taking the time to send a message! I have received your inquiry and will review it as soon as possible (usually within 24 to 48 hours).
          </p>
          
          <!-- Message Copy Box -->
          <div style="margin-top: 16px; margin-bottom: 32px;">
            <p style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #8E8E93; margin: 0 0 10px 0;">Copy of Your Message</p>
            <div style="background-color: #E5E5EA; border-left: 4px solid #34C759; border-radius: 4px; padding: 20px; border-top: 1px solid #E5E5EA; border-right: 1px solid #E5E5EA; border-bottom: 1px solid #E5E5EA;">
              <p style="margin: 0; font-size: 15px; color: #020D19; line-height: 1.6; white-space: pre-wrap; font-style: italic;">"${message}"</p>
            </div>
          </div>
          
          <p style="font-size: 15px; color: #020D19; line-height: 1.6; margin: 0;">
            In the meantime, feel free to explore more of my projects or connect with me via other platforms. I look forward to connecting with you!
          </p>
          
        </div>
        
        <!-- Footer -->
        <div style="background-color: #E5E5EA; padding: 24px 32px; text-align: center; border-top: 1px solid #E5E5EA;">
          <p style="font-size: 12px; color: #8E8E93; margin: 0;">This is an automated confirmation of your submission from hy13dev.com.</p>
          <p style="font-size: 11px; color: #8E8E93; margin: 4px 0 0 0;">&copy; ${currentYear} hy13dev. All rights reserved.</p>
        </div>
        
      </div>
    </div>
  `;

  const [err, mailResults] = await tryCatch(
    Promise.all([
      resend.emails.send({
        from: "Portfolio Website <contact@noreply.hy13dev.com>",
        to: "ylyamartchenko@gmail.com",
        replyTo: email,
        subject: `New Portfolio Message from ${firstName} ${lastName}`,
        html: adminHtml,
      }),
      resend.emails.send({
        from: "Ylya Martchenko <contact@noreply.hy13dev.com>",
        to: email,
        subject: `Thank you for your message, ${firstName}!`,
        html: visitorHtml,
      }),
    ]),
  );

  if (err) {
    console.error("Server action execution breakdown:", err);
    return {
      success: false,
      error: "Internal server error. Please try again later.",
    };
  }

  const [adminMailResult, visitorMailResult] = mailResults;

  if (adminMailResult.error) {
    console.error("Admin email sending failed:", adminMailResult.error);
    return { success: false, error: adminMailResult.error.message };
  }

  if (visitorMailResult.error)
    console.error(
      "Visitor confirmation email sending failed:",
      visitorMailResult.error,
    );

  return { success: true };
}
