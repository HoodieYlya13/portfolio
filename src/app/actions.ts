"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "Missing fields" };
  }

  try {
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <contact@noreply.hy13dev.com>",
      to: ["ylyamartchenko@gmail.com"],
      subject: `New message from ${name}`,
      text: message,
      replyTo: email,
    });

    if (error) {
      return { error: error.message };
    }

    return { success: true };
  } catch (error) {
    return { error: "Failed to send email" };
  }
}
