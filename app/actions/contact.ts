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
    website,
    elapsedMs,
    captchaToken,
  } = validatedFields.data;

  if (website.trim().length > 0) return { success: true };

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

  const sharedCss = `
    :root {
      color-scheme: light dark;
      supported-color-schemes: light dark;
    }
    @media (prefers-color-scheme: dark) {
      .email-bg { background-color: #070E17 !important; }
      .card-bg { background-color: #131C27 !important; border-color: #243242 !important; }
      .text-primary { color: #F8FAFC !important; }
      .text-secondary { color: #94A3B8 !important; }
      .border-divider { border-bottom-color: #243242 !important; border-top-color: #243242 !important; }
      .msg-box { background-color: #1A2634 !important; border-color: #243242 !important; }
      .msg-text { color: #F1F5F9 !important; }
      .footer-bg { background-color: #0F172A !important; border-top-color: #243242 !important; }
      .link-color { color: #38BDF8 !important; }
      .tag-admin { color: #FF9500 !important; }
      .tag-visitor { color: #4ADE80 !important; }
      .btn-admin { background-color: #FF9500 !important; color: #0A131D !important; }
      .msg-border-admin { border-left-color: #FF9500 !important; }
      .msg-border-visitor { border-left-color: #4ADE80 !important; }
    }
    /* Target Gmail & Outlook Mobile Dark Mode */
    [data-ogsc] .email-bg, u + .body .email-bg { background-color: #070E17 !important; }
    [data-ogsc] .card-bg, u + .body .card-bg { background-color: #131C27 !important; border-color: #243242 !important; }
    [data-ogsc] .text-primary, u + .body .text-primary { color: #F8FAFC !important; }
    [data-ogsc] .text-secondary, u + .body .text-secondary { color: #94A3B8 !important; }
    [data-ogsc] .border-divider, u + .body .border-divider { border-bottom-color: #243242 !important; border-top-color: #243242 !important; }
    [data-ogsc] .msg-box, u + .body .msg-box { background-color: #1A2634 !important; border-color: #243242 !important; }
    [data-ogsc] .msg-text, u + .body .msg-text { color: #F1F5F9 !important; }
    [data-ogsc] .footer-bg, u + .body .footer-bg { background-color: #0F172A !important; border-top-color: #243242 !important; }
    [data-ogsc] .link-color, u + .body .link-color { color: #38BDF8 !important; }
    [data-ogsc] .tag-admin, u + .body .tag-admin { color: #FF9500 !important; }
    [data-ogsc] .tag-visitor, u + .body .tag-visitor { color: #4ADE80 !important; }
    [data-ogsc] .btn-admin, u + .body .btn-admin { background-color: #FF9500 !important; color: #0A131D !important; }
    [data-ogsc] .msg-border-admin, u + .body .msg-border-admin { border-left-color: #FF9500 !important; }
    [data-ogsc] .msg-border-visitor, u + .body .msg-border-visitor { border-left-color: #4ADE80 !important; }
  `;

  const adminHtml = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="color-scheme" content="light dark" />
      <meta name="supported-color-schemes" content="light dark" />
      <title>New Portfolio Message</title>
      <style>${sharedCss}</style>
    </head>
    <body class="body email-bg" style="margin: 0; padding: 0; background-color: #F4F6F8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
      <div class="email-bg" style="background-color: #F4F6F8; padding: 40px 16px; min-height: 100%;">
        <div class="card-bg" style="max-width: 580px; margin: 0 auto; background-color: #FFFFFF; border-radius: 12px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08); overflow: hidden; border: 1px solid #E2E8F0;">
          
          <!-- Top Accent Gradient Bar -->
          <div style="height: 6px; background: linear-gradient(90deg, #FF9500 0%, #007AFF 100%);"></div>
          
          <!-- Header -->
          <div class="border-divider" style="padding: 32px 32px 24px 32px; border-bottom: 1px solid #E2E8F0;">
            <span class="tag-admin" style="font-size: 12px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: #D97706; display: inline-block; margin-bottom: 8px;">Portfolio Notification</span>
            <h1 class="text-primary" style="font-size: 20px; font-weight: 700; color: #0F172A; margin: 0;">New Message Received</h1>
            <p class="text-secondary" style="font-size: 14px; color: #475569; margin: 6px 0 0 0;">You have received a new inquiry from your website's contact form.</p>
          </div>
          
          <!-- Body Content -->
          <div style="padding: 32px;">
            
            <!-- Sender Details -->
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td class="text-secondary" style="padding: 8px 0; width: 25%; font-size: 14px; font-weight: 600; color: #475569; vertical-align: top;">From:</td>
                <td style="padding: 8px 0; font-size: 14px; vertical-align: top;">
                  <strong class="text-primary" style="color: #0F172A;">${firstName} ${lastName}</strong>
                </td>
              </tr>
              <tr>
                <td class="text-secondary" style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #475569; vertical-align: top;">Email:</td>
                <td style="padding: 8px 0; font-size: 14px; vertical-align: top;">
                  <a href="mailto:${email}" class="link-color" style="color: #0265DC; text-decoration: none; font-weight: 500;">${email}</a>
                </td>
              </tr>
            </table>
            
            <!-- Message Box -->
            <div style="margin-top: 16px; margin-bottom: 32px;">
              <p class="text-secondary" style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #475569; margin: 0 0 10px 0;">Message Content</p>
              <div class="msg-box msg-border-admin" style="background-color: #F8FAFC; border-left: 4px solid #D97706; border-radius: 4px; padding: 20px; border-top: 1px solid #E2E8F0; border-right: 1px solid #E2E8F0; border-bottom: 1px solid #E2E8F0;">
                <p class="msg-text" style="margin: 0; font-size: 15px; color: #0F172A; line-height: 1.6; white-space: pre-wrap; font-style: italic;">"${message}"</p>
              </div>
            </div>
            
            <!-- Action Button -->
            <div style="text-align: center; margin-top: 32px; margin-bottom: 16px;">
              <a href="mailto:${email}?subject=Re:%20Your%20portfolio%20message" class="btn-admin" style="background-color: #D97706; color: #FFFFFF; padding: 12px 28px; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 6px; display: inline-block; box-shadow: 0 2px 4px rgba(217, 119, 6, 0.25);">
                Reply Directly
              </a>
            </div>
            
          </div>
          
          <!-- Footer -->
          <div class="footer-bg border-divider" style="background-color: #F1F5F9; padding: 24px 32px; text-align: center; border-top: 1px solid #E2E8F0;">
            <p class="text-secondary" style="font-size: 12px; color: #475569; margin: 0;">This is an automated notification from your portfolio website's contact action.</p>
            <p class="text-secondary" style="font-size: 11px; color: #475569; margin: 4px 0 0 0;">&copy; ${currentYear} HY13dev. All rights reserved.</p>
          </div>
          
        </div>
      </div>
    </body>
    </html>
  `;

  const visitorHtml = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="color-scheme" content="light dark" />
      <meta name="supported-color-schemes" content="light dark" />
      <title>Thank You For Your Message</title>
      <style>${sharedCss}</style>
    </head>
    <body class="body email-bg" style="margin: 0; padding: 0; background-color: #F4F6F8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
      <div class="email-bg" style="background-color: #F4F6F8; padding: 40px 16px; min-height: 100%;">
        <div class="card-bg" style="max-width: 580px; margin: 0 auto; background-color: #FFFFFF; border-radius: 12px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08); overflow: hidden; border: 1px solid #E2E8F0;">
          
          <!-- Top Accent Gradient Bar -->
          <div style="height: 6px; background: linear-gradient(90deg, #16A34A 0%, #007AFF 100%);"></div>
          
          <!-- Header -->
          <div class="border-divider" style="padding: 32px 32px 24px 32px; border-bottom: 1px solid #E2E8F0;">
            <span class="tag-visitor" style="font-size: 12px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: #16A34A; display: inline-block; margin-bottom: 8px;">Message Confirmation</span>
            <h1 class="text-primary" style="font-size: 20px; font-weight: 700; color: #0F172A; margin: 0;">Thanks for reaching out!</h1>
            <p class="text-secondary" style="font-size: 14px; color: #475569; margin: 6px 0 0 0;">Hi ${firstName}, I've received your message and will get back to you shortly.</p>
          </div>
          
          <!-- Body Content -->
          <div style="padding: 32px;">
            
            <p class="text-primary" style="font-size: 15px; color: #0F172A; line-height: 1.6; margin: 0 0 24px 0;">
              Thank you for visiting my portfolio and taking the time to send a message! I have received your inquiry and will review it as soon as possible (usually within 24 to 48 hours).
            </p>
            
            <!-- Message Copy Box -->
            <div style="margin-top: 16px; margin-bottom: 32px;">
              <p class="text-secondary" style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #475569; margin: 0 0 10px 0;">Copy of Your Message</p>
              <div class="msg-box msg-border-visitor" style="background-color: #F8FAFC; border-left: 4px solid #16A34A; border-radius: 4px; padding: 20px; border-top: 1px solid #E2E8F0; border-right: 1px solid #E2E8F0; border-bottom: 1px solid #E2E8F0;">
                <p class="msg-text" style="margin: 0; font-size: 15px; color: #0F172A; line-height: 1.6; white-space: pre-wrap; font-style: italic;">"${message}"</p>
              </div>
            </div>
            
            <p class="text-primary" style="font-size: 15px; color: #0F172A; line-height: 1.6; margin: 0;">
              In the meantime, feel free to explore more of my projects or connect with me via other platforms. I look forward to connecting with you!
            </p>
            
          </div>
          
          <!-- Footer -->
          <div class="footer-bg border-divider" style="background-color: #F1F5F9; padding: 24px 32px; text-align: center; border-top: 1px solid #E2E8F0;">
            <p class="text-secondary" style="font-size: 12px; color: #475569; margin: 0;">This is an automated confirmation of your submission from hy13dev.com.</p>
            <p class="text-secondary" style="font-size: 11px; color: #475569; margin: 4px 0 0 0;">&copy; ${currentYear} HY13dev. All rights reserved.</p>
          </div>
          
        </div>
      </div>
    </body>
    </html>
  `;

  const [err, mailResults] = await tryCatch(
    Promise.all([
      resend.emails.send({
        from: "Portfolio Website <contact@noreply.hy13dev.com>",
        to: "ylyamartchenko+portfolio-contact@proton.me",
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
