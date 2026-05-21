// TODO: style this

"use server";

import { Resend } from "resend";
import { contactSchema, type ContactFormData } from "./schemas";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(data: ContactFormData) {
  const validatedFields = contactSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Invalid form submission data. Please check your inputs.",
    };
  }

  const { firstName, lastName, email, message } = validatedFields.data;

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

  try {
    const { error } = await resend.emails.send({
      from: "Portfolio Website <contact@noreply.hy13dev.com>",
      to: "ylyamartchenko@gmail.com",
      replyTo: email,
      subject: `New Portfolio Message from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; color: #333; line-height: 1.6;">
          <h2 style="color: #2563eb; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Portfolio Inquiry</h2>
          <p><strong>From:</strong> ${firstName} ${lastName} (&lt;${email}&gt;)</p>
          <div style="background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 15px; margin-top: 20px; border-radius: 4px;">
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    if (error) return { success: false, error: error.message };

    return { success: true };
  } catch (err) {
    console.error("Server action execution breakdown:", err);
    return {
      success: false,
      error: "Internal server error. Please try again later.",
    };
  }
}
