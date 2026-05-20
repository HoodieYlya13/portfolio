"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Bot, ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import TextType from "@/components/react-bits/TextType";
import { Button } from "@/components/ui/button";

const reveal = (
  el: HTMLElement | null,
  onComplete?: () => void
) => {
  if (!el) {
    onComplete?.();
    return;
  }
  gsap.fromTo(
    el,
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
      onComplete,
    }
  );
};

interface HeroIntroProps {
  restartKey: number;
}

export default function HeroIntro({ restartKey }: HeroIntroProps) {
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    gsap.set([h2Ref.current, buttonRef.current, scrollRef.current], {
      opacity: 0,
      y: 24,
    });
  }, [restartKey]);

  const handleH1Complete = () => {
    reveal(h2Ref.current, () => {
      reveal(buttonRef.current, () => {
        reveal(scrollRef.current);
      });
    });
  };

  return (
    <div className="relative flex flex-col items-center justify-center gap-12 px-6 max-w-3xl lg:max-w-4xl mx-auto text-center">
      <div className="flex flex-col gap-4 leading-tight text-balance">
        <TextType
          key={restartKey}
          as="h1"
          text="Don't have time to read through my resume?"
          loop={false}
          typingSpeed={55}
          initialDelay={400}
          showCursor
          cursorCharacter="|"
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold"
          onTypingComplete={handleH1Complete}
        />

        <h2
          ref={h2Ref}
          className="sm:text-lg md:text-xl lg:text-2xl xl:text-3xl"
        >
          Let my AI give you a custom summary.
        </h2>
      </div>

      <div ref={buttonRef}>
        <Button
          asChild
          variant="glass"
          size="lg"
          className="h-auto min-h-14 gap-3 px-8 py-5 text-lg md:text-xl font-semibold animate-bounce"
        >
          <Link href="/ylya-bot" className="flex items-center gap-2.5">
            <Bot className="size-5 md:size-6" strokeWidth={2} />
            Talk to YlyaBot
          </Link>
        </Button>
      </div>

      <a
        ref={scrollRef}
        href="#classic-background"
        className="inline-flex items-center gap-1.5 text-sm text-foreground/60 hover:text-foreground/90 transition-colors group"
      >
        Or scroll to read my classic background
        <ChevronDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
      </a>
    </div>
  );
}
