"use client";

import { cn } from "@/lib/utils";
import { Briefcase, Landmark } from "lucide-react";

export type TimelineTab = "engineering" | "foundational";

interface TimelineToggleProps {
  activeTab: TimelineTab;
  onChange: (tab: TimelineTab) => void;
}

export default function TimelineToggle({
  activeTab,
  onChange,
}: TimelineToggleProps) {
  const isEngineering = activeTab === "engineering";

  return (
    <div className="relative flex p-1.5 bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 hover:border-foreground/15 rounded-full max-w-md mx-auto shadow-inner transition-colors duration-300 backdrop-blur-md">
      <div
        className={cn(
          "absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-primary rounded-full transition-all duration-300 ease-out shadow-[0_2px_15px_rgba(var(--primary-rgb,0,122,255),0.4)]",
          isEngineering ? "translate-x-0" : "translate-x-full",
        )}
      />

      <button
        onClick={() => onChange("engineering")}
        aria-label="Toggle Engineering Experience"
        className={cn(
          "relative z-10 flex-1 py-2.5 px-4 rounded-full flex items-center justify-center gap-2 text-sm font-semibold transition-colors duration-300 cursor-pointer",
          isEngineering
            ? "text-primary-foreground font-bold"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        <Briefcase className="w-4 h-4" />
        <span>Engineering</span>
      </button>

      <button
        onClick={() => onChange("foundational")}
        aria-label="Toggle Foundational Experience"
        className={cn(
          "relative z-10 flex-1 py-2.5 px-4 rounded-full flex items-center justify-center gap-2 text-sm font-semibold transition-colors duration-300 cursor-pointer",
          !isEngineering
            ? "text-primary-foreground font-bold"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        <Landmark className="w-4 h-4" />
        <span>Foundational</span>
      </button>
    </div>
  );
}
