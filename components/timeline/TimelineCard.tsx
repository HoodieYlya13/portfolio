import { cn } from "@/lib/utils";
import { MapPin, Calendar, ExternalLink } from "lucide-react";
import { renderTextWithInlineFormatting } from "@/components/ui/Markdown";

export interface TimelineCardProps {
  range: string;
  title: string;
  subtitle: string;
  location: string;
  summary?: string;
  bullets?: string[];
  align: "left" | "right";
  isHero?: boolean;
  meta?: {
    project_url: string;
    note: string;
  };
}



export default function TimelineCard({
  range,
  title,
  subtitle,
  location,
  summary,
  bullets,
  align,
  isHero = false,
  meta,
}: TimelineCardProps) {
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
          "absolute w-4 h-4 rounded-full border-2 border-primary bg-background top-6",
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

        <h3 className="text-xl font-bold mb-1 text-foreground">{title}</h3>

        <div className="text-primary font-medium mb-3">{subtitle}</div>

        {summary && (
          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
            {renderTextWithInlineFormatting(summary)}
          </p>
        )}

        {bullets && bullets.length > 0 && (
          <ul
            className={cn(
              "text-muted-foreground text-sm mb-4 list-disc pl-4 space-y-2 leading-relaxed text-left",
              isLeft ? "md:text-left" : "md:text-left",
            )}
          >
            {bullets.map((bullet, idx) => (
              <li key={idx}>{renderTextWithInlineFormatting(bullet)}</li>
            ))}
          </ul>
        )}

        {meta && (meta.project_url || meta.note) && (
          <div
            className={cn(
              "mt-3 text-xs flex flex-wrap gap-2 items-center text-muted-foreground",
              isLeft ? "md:justify-end" : "md:justify-start",
            )}
          >
            {meta.project_url && (
              <a
                href={meta.project_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:underline font-semibold"
              >
                <span>View Project</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {meta.note && <span className="opacity-80">({meta.note})</span>}
          </div>
        )}

        <div
          className={cn(
            "flex items-center gap-1 text-xs text-muted-foreground mt-4",
            isLeft ? "md:justify-end" : "md:justify-start",
          )}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
}
