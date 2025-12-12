"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendEmail } from "@/app/actions";
import { useState } from "react";

export function Contact() {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setMessage("");
    setError(false);

    const result = await sendEmail(formData);

    if (result.error) {
      setError(true);
      setMessage(result.error);
    } else {
      setMessage("Message sent successfully!");
      // optionally reset form
      const form = document.getElementById("contact-form") as HTMLFormElement;
      form?.reset();
    }
    setPending(false);
  }

  return (
    <section id="contact" className="py-24 container mx-auto px-4 max-w-2xl">
      <div className="space-y-4 text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tighter">Get in Touch</h2>
        <p className="text-muted-foreground">
          Have a question or want to work together? Send me a message.
        </p>
      </div>
      <form id="contact-form" action={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <Input id="name" name="name" placeholder="John Doe" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium">
            Message
          </label>
          <Textarea
            id="message"
            name="message"
            placeholder="Your message..."
            className="min-h-[150px]"
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Sending..." : "Send Message"}
        </Button>
        {message && (
          <p
            className={`text-sm text-center ${error ? "text-destructive" : "text-green-500"}`}
          >
            {message}
          </p>
        )}
      </form>
    </section>
  );
}
