import { Suspense } from "react";
import LiquidGlassBackground from "@/components/webgl/LiquidGlassBackground";
import { ContactForm } from "@/components/contact/ContactForm";
import { FeedbackForm } from "@/components/contact/FeedbackForm";
import { findFeedbackApp } from "@/lib/feedback-apps";

/** ?app=<id> (see lib/feedback-apps.ts): feedback about that app. Anything else: the contact form. */
async function ContactOrFeedback({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const { app } = await searchParams;
  const feedbackApp = findFeedbackApp(typeof app === "string" ? app : null);
  return feedbackApp ? <FeedbackForm app={feedbackApp} /> : <ContactForm />;
}

export default function ContactPage({ searchParams }: PageProps<"/contact">) {
  return (
    <section className="relative flex-1 flex flex-col items-center justify-center p-4 overflow-hidden padding-footer xs:pt-20">
      <LiquidGlassBackground />

      <Suspense fallback={null}>
        <ContactOrFeedback searchParams={searchParams} />
      </Suspense>
    </section>
  );
}
