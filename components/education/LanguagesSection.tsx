"use client";

import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import ScrollReveal from "../timeline/ScrollReveal";

interface LanguagesSectionProps {
  languages: Array<{
    name: string;
    cefr: string;
    label: string;
  }>;
}

export default function LanguagesSection({ languages }: LanguagesSectionProps) {
  return (
    <ScrollReveal className="max-w-5xl mx-auto px-4 w-full">
      <section>
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Languages
          </h2>

          <p className="text-muted-foreground mt-2">
            Spoken languages and proficiency levels.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto list-none p-0 m-0">
          {languages.map((language, index) => {
            const isHero = index === 0;

            return (
              <li
                key={language.name}
                className={cn(
                  "p-6 rounded-2xl text-center transition-all duration-300 hover:scale-[1.02]",
                  "border border-foreground/15 backdrop-blur-md",
                  isHero
                    ? "bg-linear-to-br from-background/60 to-primary/15 shadow-lg shadow-primary/5 border-primary/30"
                    : "bg-linear-to-br from-background/50 to-primary/10 shadow-sm hover:shadow-md",
                )}
              >
                <div className="flex justify-center mb-3">
                  <Globe className="w-5 h-5 text-primary" aria-hidden />
                </div>

                <h3 className="text-lg font-bold text-foreground">
                  {language.name}
                </h3>

                <p className="text-primary font-medium mt-1 text-sm">
                  {language.cefr}
                </p>

                <p className="text-muted-foreground text-xs mt-2">
                  {language.label}
                </p>
              </li>
            );
          })}
        </ul>
      </section>
    </ScrollReveal>
  );
}
