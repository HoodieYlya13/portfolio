"use client";

import { useEffect } from "react";
import LiquidGlassBackground from "@/components/webgl/LiquidGlassBackground";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden pb-40 sm:pb-0">
      <LiquidGlassBackground />
      
      <div className="backdrop-blur-md bg-foreground/40 text-background p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-6xl font-bold mb-2 font-display">Oops!</h1>
        <h2 className="text-xl font-semibold mb-4">Something went wrong!</h2>
        <p className="text-sm opacity-70 mb-6">
          An unexpected error has occurred. We have been notified and are looking into it.
        </p>
        <Button onClick={() => reset()} variant="default">
          Try again
        </Button>
      </div>
    </section>
  );
}
