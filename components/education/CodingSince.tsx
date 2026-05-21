import { Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import ScrollReveal from "../timeline/ScrollReveal";

interface CodingSinceProps {
  since: number;
}

export default function CodingSince({ since }: CodingSinceProps) {
  return (
    <ScrollReveal className="max-w-5xl mx-auto px-4 flex justify-center">
      <p
        className={cn(
          "inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm",
          "border border-foreground/15 backdrop-blur-md",
          "bg-linear-to-br from-background/50 to-primary/10 text-muted-foreground",
        )}
      >
        <Code2 className="w-4 h-4 text-primary shrink-0" aria-hidden />
        <span>
          Coding since{" "}
          <span className="text-foreground font-semibold">{since}</span>
        </span>
      </p>
    </ScrollReveal>
  );
}
