"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface NavbarContainerProps {
  children: React.ReactNode;
}

export default function NavbarContainer({ children }: NavbarContainerProps) {
  const pathname = usePathname();

  const [visible, setVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(() => {
    if (typeof window !== "undefined")
      return !!(window as unknown as { __portfolioModalOpen?: boolean })
        .__portfolioModalOpen;
    return false;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleModalChange = (e: Event) => {
        const customEvent = e as CustomEvent<{ open?: boolean }>;
        setIsModalOpen(!!customEvent.detail?.open);
      };

      window.addEventListener(
        "portfolio-modal-change",
        handleModalChange as EventListener,
      );
      return () => {
        window.removeEventListener(
          "portfolio-modal-change",
          handleModalChange as EventListener,
        );
      };
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);

    const checkbox = document.getElementById("menu-toggle") as HTMLInputElement;
    if (checkbox) checkbox.checked = false;
  }, [pathname]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!isModalOpen) setVisible(true);
  }, [isModalOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const isScrollable = documentHeight > windowHeight + 10;
      if (!isScrollable) return;

      const isAtBottom = currentScrollY + windowHeight >= documentHeight - 10;
      const scrollingUp = currentScrollY < lastScrollY;

      if (isAtBottom) setVisible(false);
      else if (scrollingUp || currentScrollY < 50) setVisible(true);

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const isScrollable = documentHeight > windowHeight + 10;

      if (!isScrollable) {
        if (e.deltaY > 5) setVisible(false);
        else if (e.deltaY < -5) setVisible(true);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const isScrollable = documentHeight > windowHeight + 10;

      if (!isScrollable) {
        const currentY = e.touches[0].clientY;
        const diffY = currentY - touchStartY;

        if (diffY < -15) setVisible(false);
        else if (diffY > 15) setVisible(true);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

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

  if (pathname === "/ylya-bot") return null;

  const isNavbarVisible = visible && !isModalOpen;

  return (
    <div
      className="fixed bottom-4 md:bottom-6 left-1/2 w-[95%] max-w-2xl backdrop-blur-md text-background dark:text-foreground rounded-xl md:rounded-2xl shadow-lg z-50 flex flex-col overflow-hidden transition-all duration-500 ease-in-out bg-foreground/40 peer-checked:bg-apple-dark-gray/70 peer-checked:[&_.icon-close]:block peer-checked:[&_.icon-menu]:hidden peer-checked:[&_.menu-content]:grid-rows-[1fr] peer-checked:[&_.bottom-bar]:pt-4 peer-checked:[&_.line-sep]:scale-x-100 peer-checked:dark:[&_.line-sep]:bg-foreground/20 peer-checked:[&_.line-sep]:delay-500 peer-checked:[&_.menu-item]:translate-y-0 peer-checked:[&_.menu-item]:opacity-100"
      style={{
        transform: `translate(-50%, ${isNavbarVisible ? "0" : "calc(100% + 2rem)"})`,
      }}
      onClick={handleLinkClick}
    >
      {children}
    </div>
  );
}
