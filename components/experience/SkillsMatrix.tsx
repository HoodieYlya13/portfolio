import {
  Code2,
  Database,
  Binary,
  Terminal,
  Brain,
  Wrench,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ScrollReveal from "@/components/timeline/ScrollReveal";

interface SkillsMatrixProps {
  skills: {
    primary_web_stack: string[];
    backend_and_data: string[];
    polyglot_languages: string[];
    devops_and_systems: string[];
    ai_engineering: string[];
    ecosystem_tools: string[];
    leadership_traits: string[];
  };
}

export default function SkillsMatrix({ skills }: SkillsMatrixProps) {
  const categories = [
    {
      key: "primary_web_stack",
      title: "Web Stack",
      icon: Code2,
      items: skills.primary_web_stack || [],
    },
    {
      key: "backend_and_data",
      title: "Backend & Data",
      icon: Database,
      items: skills.backend_and_data || [],
    },
    {
      key: "polyglot_languages",
      title: "Polyglot Languages",
      icon: Binary,
      items: skills.polyglot_languages || [],
    },
    {
      key: "devops_and_systems",
      title: "DevOps & Systems",
      icon: Terminal,
      items: skills.devops_and_systems || [],
    },
    {
      key: "ai_engineering",
      title: "AI Engineering",
      icon: Brain,
      items: skills.ai_engineering || [],
    },
    {
      key: "ecosystem_tools",
      title: "Ecosystem & Tools",
      icon: Wrench,
      items: skills.ecosystem_tools || [],
    },
    {
      key: "leadership_traits",
      title: "Leadership & Traits",
      icon: Award,
      items: skills.leadership_traits || [],
      isHero: true,
    },
  ];

  return (
    <ScrollReveal className="max-w-5xl mx-auto px-4 w-full">
      <section className="flex flex-col gap-8 md:gap-12">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Technical Arsenal
          </h2>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            Disciplines, frameworks, and engineering attributes I work with.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto w-full">
          {categories.map((category) => {
            const Icon = category.icon;
            const isHero = category.isHero;

            return (
              <div
                key={category.key}
                className={cn(
                  "p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02]",
                  "border border-foreground/15 backdrop-blur-md flex flex-col",
                  isHero
                    ? "bg-linear-to-br from-background/60 to-primary/15 shadow-lg shadow-primary/5 border-primary/30 sm:col-span-2 lg:col-span-3 text-center items-center"
                    : "bg-linear-to-br from-background/50 to-primary/10 shadow-sm hover:shadow-md",
                )}
              >
                <div
                  className={cn(
                    "flex items-center gap-3 mb-4",
                    isHero
                      ? "justify-center flex-col sm:flex-row"
                      : "justify-start",
                  )}
                >
                  <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    {category.title}
                  </h3>
                </div>

                <div
                  className={cn(
                    "flex flex-wrap gap-2.5 w-full",
                    isHero ? "justify-center max-w-2xl" : "justify-start",
                  )}
                >
                  {category.items.map((skill) => (
                    <span
                      key={skill}
                      className={cn(
                        "px-3.5 py-1.5 text-xs rounded-full font-medium transition-all duration-300 select-none",
                        "bg-primary/5 hover:bg-primary/15 border border-primary/10 hover:border-primary/30 text-foreground hover:scale-105 hover:shadow-[0_0_12px_rgba(255,100,0,0.2)] cursor-default",
                      )}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </ScrollReveal>
  );
}
