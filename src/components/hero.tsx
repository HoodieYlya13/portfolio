"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="container mx-auto px-4 py-24 md:py-32 flex flex-col items-center text-center space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
          Building Digital <span className="text-primary">Experiences</span>
        </h1>
        <p className="mt-4 text-xl text-muted-foreground max-w-[600px] mx-auto">
          I am a developer passionate about building accessible, pixel-perfect,
          performant web experiences.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex gap-4"
      >
        <Button asChild size="lg">
          <Link href="#contact">Get in Touch</Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="#projects">View Work</Link>
        </Button>
      </motion.div>
    </section>
  );
}
