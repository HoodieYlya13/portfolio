import React from "react";
import NavItem from "./NavItem";

interface NavbarProps {
  children: React.ReactNode;
}

export default function Navbar({ children }: NavbarProps) {
  return (
    <>
      <input type="checkbox" id="menu-toggle" className="hidden peer" />
      
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-2xl backdrop-blur-md text-background rounded-xl shadow-lg z-50 flex flex-col overflow-hidden transition-colors duration-500 ease-in-out bg-foreground/40 peer-checked:bg-foreground/70 peer-checked:[&_.icon-close]:block peer-checked:[&_.icon-menu]:hidden peer-checked:[&_.menu-content]:grid-rows-[1fr] peer-checked:[&_.line-sep]:scale-x-100 peer-checked:[&_.line-sep]:delay-500">
        
        <div className="transition-[grid-template-rows] duration-500 ease-in-out grid grid-rows-[0fr] menu-content">
          <div className="overflow-hidden">
            <div className="p-2 pb-4 flex flex-col gap-3">
              {children}
            </div>
          </div>
        </div>

        <div className="px-2 pb-2 flex items-center justify-between relative pt-2 bottom-bar peer-checked:pt-4">
          <div
            className="absolute top-0 left-[2.5%] w-[95%] h-px bg-background/20 transition-transform duration-250 ease-in-out origin-left scale-x-0 line-sep"
          />
          
          <NavItem
            icon={
              <video
                src="/memoji-video3.mov"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center"
              />
            }
            className="flex-1 min-w-0"
          >
            <div className="font-bold uppercase tracking-wide">
              Ylya Martchenko
            </div>
            <div className="overflow-hidden whitespace-nowrap w-full mask-marquee">
              <div className="scroll-marquee gap-2 items-center">
                {[
                  "Next.js Expert",
                  "•",
                  "Software Engineer",
                  "•",
                  "Full Stack Developer",
                  "•",
                  "Next.js Expert",
                  "•",
                  "Software Engineer",
                  "•",
                  "Full Stack Developer",
                  "•",
                ].map((text, index) => (
                  <span
                    key={index}
                    className="text-xs opacity-70 uppercase font-medium shrink-0"
                  >
                    {text}
                  </span>
                ))}
              </div>
            </div>
          </NavItem>

          <label
            htmlFor="menu-toggle"
            className="p-3 text-background focus:outline-none hover:text-background/70 transition-colors duration-300 ease-in-out cursor-pointer"
            aria-label="Toggle Menu"
          >
            {/* Hamburger Icon */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon-menu block"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            {/* X Icon */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon-close hidden"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </label>
        </div>
      </div>
    </>
  );
}
