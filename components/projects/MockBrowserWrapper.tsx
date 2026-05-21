"use client";

import { useState } from "react";
import { X, RotateCw, Maximize2 } from "lucide-react";
interface MockBrowserWrapperProps {
  projectUrl: string;
  children: React.ReactNode;
}

export default function MockBrowserWrapper({
  projectUrl,
  children,
}: MockBrowserWrapperProps) {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleClose = () => {
    window.dispatchEvent(new CustomEvent("close-portfolio-modal"));
  };

  return (
    <div className="mt-4 shadow-2xl rounded-2xl overflow-hidden border border-border/80 bg-card transition-all duration-300">
      <div className="bg-muted px-4 py-3 flex items-center gap-3 border-b border-border/40 select-none">
        <div className="flex gap-1.5 group/controls">
          <button
            onClick={() => handleClose()}
            title="Close"
            aria-label="Close"
            className="w-3.5 h-3.5 rounded-full bg-apple-red flex items-center justify-center transition-all duration-200 hover:brightness-90 active:scale-90 cursor-pointer"
          >
            <X className="w-2.5 h-2.5 text-red-950/80 opacity-0 group-hover/controls:opacity-100 transition-opacity duration-200 pointer-events-none" />
          </button>

          <button
            onClick={() => setRefreshKey((prev) => prev + 1)}
            title="Refresh Preview"
            aria-label="Refresh Preview"
            className="w-3.5 h-3.5 rounded-full bg-apple-yellow flex items-center justify-center transition-all duration-200 hover:brightness-90 active:scale-90 cursor-pointer"
          >
            <RotateCw className="w-2 h-2 text-yellow-950/80 opacity-0 group-hover/controls:opacity-100 transition-opacity duration-200 pointer-events-none" />
          </button>

          <button
            onClick={() =>
              window.open(projectUrl, "_blank", "noopener,noreferrer")
            }
            title="Open Full Page"
            aria-label="Open Full Page"
            className="w-3.5 h-3.5 rounded-full bg-apple-green flex items-center justify-center transition-all duration-200 hover:brightness-90 active:scale-90 cursor-pointer"
          >
            <Maximize2 className="w-2 h-2.5 text-green-950/80 opacity-0 group-hover/controls:opacity-100 transition-opacity duration-200 pointer-events-none" />
          </button>
        </div>

        <a
          href={projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Open in new tab"
          className="flex-1 mx-4 block bg-card/60 dark:bg-card/25 hover:bg-card/90 dark:hover:bg-card/45 border border-foreground/15 dark:border-foreground/10 hover:border-foreground/25 dark:hover:border-foreground/20 transition-colors text-[11px] text-muted-foreground hover:text-foreground text-left py-1.5 px-3.5 rounded-lg font-mono truncate cursor-pointer"
        >
          {projectUrl}
        </a>
      </div>

      <div key={refreshKey}>
        {children}
      </div>
    </div>
  );
}
