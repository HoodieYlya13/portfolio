"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function GetInTouchButton() {
  const pathname = usePathname();

  if (pathname === "/contact") return null;

  return (
    <Button
      asChild
      variant="glass"
      className="fixed top-4 right-4 md:top-6 md:right-6 z-50"
    >
      <Link href="/contact" aria-label="Get in touch">
        <span>Get in touch</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4 transition-transform duration-300 ease-in-out group-hover/button:translate-x-0.5"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </Link>
    </Button>
  );
}
