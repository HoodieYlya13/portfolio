import Link from "next/link";
import LiquidGlassBackground from "@/components/webgl/LiquidGlassBackground";
import { Button } from "@/components/ui/button";

export default function YlyaBotPage() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden pb-40 sm:padding-footer">
      <LiquidGlassBackground />

      <div className="backdrop-blur-md bg-foreground/40 text-background p-8 rounded-xl shadow-lg max-w-md w-full text-center z-10">
        <h1 className="text-8xl font-bold mb-2 font-display">WAIT</h1>
        <h2 className="text-2xl font-semibold mb-4">Coming soon</h2>
        <p className="text-sm opacity-70 mb-6">YlyaBot is not ready yet.</p>
        <Button asChild variant="default">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </section>
  );
}
