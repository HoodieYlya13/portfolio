import LiquidGlassBackground from "@/components/webgl/LiquidGlassBackground";
import { ContactForm } from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <section className="relative flex-1 flex flex-col items-center justify-center p-4 overflow-hidden padding-footer xs:pt-20">
      <LiquidGlassBackground />

      <ContactForm />
    </section>
  );
}
