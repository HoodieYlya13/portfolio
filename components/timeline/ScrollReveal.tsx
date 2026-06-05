"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useIntersectionObserver } from "@/lib/hooks/useIntersectionObserver";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScrollReveal({ children, className }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useIntersectionObserver(ref);

  return (
    <div
      ref={ref}
      data-state="hidden"
      className={cn(
        "reveal-on-scroll transition-all duration-700 ease-out",
        "opacity-0 translate-y-8 data-[state=visible]:opacity-100 data-[state=visible]:translate-y-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
