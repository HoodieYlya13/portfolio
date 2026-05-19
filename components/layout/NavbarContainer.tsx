"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface NavbarContainerProps {
  children: React.ReactNode;
}

export default function NavbarContainer({ children }: NavbarContainerProps) {
  const [visible, setVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  const isProjectDetail = pathname.startsWith("/projects/") && pathname !== "/projects";

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!isProjectDetail) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
    }
  }, [isProjectDetail]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const isAtBottom = currentScrollY + windowHeight >= documentHeight - 10;
      const scrollingUp = currentScrollY < lastScrollY;

      if (isAtBottom) setVisible(false);
      else if (scrollingUp || currentScrollY < 50) setVisible(true);

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLinkClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const isLink = target.closest("a");

    if (isLink) {
      const checkbox = document.getElementById(
        "menu-toggle",
      ) as HTMLInputElement;
      if (checkbox) checkbox.checked = false;
    }
  };

  const isNavbarVisible = visible && !isProjectDetail;

  return (
    <div
      className="fixed bottom-4 md:bottom-6 left-1/2 w-[95%] max-w-2xl backdrop-blur-md text-background rounded-xl md:rounded-2xl shadow-lg z-50 flex flex-col overflow-hidden transition-all duration-500 ease-in-out bg-foreground/40 peer-checked:bg-foreground/70 peer-checked:[&_.icon-close]:block peer-checked:[&_.icon-menu]:hidden peer-checked:[&_.menu-content]:grid-rows-[1fr] peer-checked:[&_.line-sep]:scale-x-100 peer-checked:[&_.line-sep]:delay-500 peer-checked:[&_.menu-item]:translate-y-0 peer-checked:[&_.menu-item]:opacity-100"
      style={{
        transform: `translate(-50%, ${isNavbarVisible ? "0" : "calc(100% + 2rem)"})`,
      }}
      onClick={handleLinkClick}
    >
      {children}
    </div>
  );
}

