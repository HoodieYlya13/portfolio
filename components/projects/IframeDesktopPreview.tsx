"use client";

import { useState, useEffect, useRef } from "react";

interface IframeDesktopPreviewProps {
  src: string;
  title: string;
}

export default function IframeDesktopPreview({
  src,
  title,
}: IframeDesktopPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.6);
  const [containerHeight, setContainerHeight] = useState(480);

  const desktopWidth = 1728;
  const desktopHeight = 1117;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleResize = () => {
      const width = container.getBoundingClientRect().width;
      if (width === 0) return;

      const newScale = width / desktopWidth;
      setScale(newScale);
      setContainerHeight(desktopHeight * newScale);
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ height: `${containerHeight}px` }}
      className="w-full max-w-full overflow-hidden relative bg-card transition-all duration-300"
    >
      <iframe
        src={src}
        title={title}
        tabIndex={-1}
        onLoad={() => {
          window.focus();
        }}
        style={{
          width: `${desktopWidth}px`,
          height: `${desktopHeight}px`,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          border: "none",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        allow="accelerometer; gyroscope; magnetometer; xr-spatial-tracking; gamepad; autoplay"
      />
    </div>
  );
}
