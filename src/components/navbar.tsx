"use client";

import * as React from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="font-bold text-xl">
          Portfolio
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="#projects"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Projects
          </Link>
          <Link
            href="#about"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            About
          </Link>
          <Link
            href="#contact"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Contact
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
