// TODO: style this

import LiquidGlassBackground from "@/components/webgl/LiquidGlassBackground";
import { ContactForm } from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden padding-footer">
      <LiquidGlassBackground />

      <ContactForm />
    </section>
  );
}
