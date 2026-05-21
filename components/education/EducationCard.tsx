import { cn } from "@/lib/utils";
import { MapPin, Calendar } from "lucide-react";

interface EducationCardProps {
  range: string;
  degree: string;
  institution: string;
  location: string;
  summary: string;
  align: "left" | "right";
  isHero?: boolean;
}

export default function EducationCard({
  range,
  degree,
  institution,
  location,
  summary,
  align,
  isHero = false,
}: EducationCardProps) {
  const isLeft = align === "left";

  return (
    <div
      data-state="hidden"
      className={cn(
        "relative flex flex-col md:w-[calc(50%-2rem)] reveal-on-scroll transition-all duration-700 ease-out",
        "opacity-0 translate-y-8 data-[state=visible]:opacity-100 data-[state=visible]:translate-y-0",
        isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8",
        "pl-12 md:pl-0",
      )}
    >
      <div
        className={cn(
          "absolute w-4 h-4 rounded-full border-2 border-primary bg-background z-10 top-6",
          "-left-2",
          isLeft ? "md:left-auto md:-right-10" : "md:-left-10",
        )}
      />

      <div
        className={cn(
          "p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02]",
          "border border-foreground/15 backdrop-blur-md",
          isHero
            ? "bg-linear-to-br from-background/60 to-primary/15 shadow-lg shadow-primary/5 border-primary/30"
            : "bg-linear-to-br from-background/50 to-primary/10 shadow-sm hover:shadow-md",
          isLeft ? "md:text-right" : "md:text-left",
        )}
      >
        <div
          className={cn(
            "flex items-center gap-2 text-sm text-muted-foreground mb-2",
            isLeft ? "md:justify-end" : "md:justify-start",
          )}
        >
          <Calendar className="w-4 h-4" />
          <span>{range}</span>
        </div>

        <h3 className="text-xl font-bold mb-1 text-foreground">{degree}</h3>

        <div className="text-primary font-medium mb-3">{institution}</div>

        <p className="text-muted-foreground text-sm mb-4">{summary}</p>

        <div
          className={cn(
            "flex items-center gap-1 text-xs text-muted-foreground",
            isLeft ? "md:justify-end" : "md:justify-start",
          )}
        >
          <MapPin className="w-3 h-3" />
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
}
