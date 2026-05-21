'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface TimelineContainerProps {
  children: React.ReactNode;
  lineColor?: string;
  glowColor?: string;
}

export default function TimelineContainer({
  children,
  lineColor = "from-primary to-apple-orange",
  glowColor = "shadow-[0_0_15px_rgba(0,122,255,0.8)]",
}: TimelineContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fillHeight, setFillHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const start = windowHeight * 0.6;
      const end = windowHeight * 0.5;
      
      const currentTop = rect.top;
      const totalHeight = rect.height;
      
      const progress = (start - currentTop) / (totalHeight + start - end);
      const percentage = Math.min(100, Math.max(0, progress * 100));
      
      setFillHeight(percentage);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-state', 'visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const elements = containerRef.current?.querySelectorAll('.reveal-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative max-w-5xl mx-auto sm:pt-8 px-4">
      <div className="space-y-16 relative">
        <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-border/50">
          <div 
            className={cn(
              "absolute top-0 left-0 w-full bg-linear-to-b transition-all duration-100 ease-out",
              lineColor,
              glowColor
            )}
            style={{ height: `${fillHeight}%` }}
          />
        </div>
        
        {children}
      </div>
    </div>
  );
}
