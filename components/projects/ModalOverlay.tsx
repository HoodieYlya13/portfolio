"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useSafeBack } from "@/components/layout/NavigationProvider";

interface ModalOverlayProps {
  children: React.ReactNode;
}

export default function ModalOverlay({ children }: ModalOverlayProps) {
  const safeBack = useSafeBack();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalWidth = document.body.style.width;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      const originalScrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";

      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = originalWidth;
      window.scrollTo(0, scrollY);

      document.documentElement.style.scrollBehavior = originalScrollBehavior;
    };
  }, [isOpen]);

  const handleClose = () => {
    window.dispatchEvent(new CustomEvent("close-portfolio-modal"));
    setIsOpen(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (pathname.includes("/projects/")) setIsOpen(true);
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      (
        window as unknown as { __portfolioModalOpen?: boolean }
      ).__portfolioModalOpen = isOpen;
      window.dispatchEvent(
        new CustomEvent("portfolio-modal-change", { detail: { open: isOpen } }),
      );
    }
    return () => {
      if (typeof window !== "undefined") {
        (
          window as unknown as { __portfolioModalOpen?: boolean }
        ).__portfolioModalOpen = false;
        window.dispatchEvent(
          new CustomEvent("portfolio-modal-change", {
            detail: { open: false },
          }),
        );
      }
    };
  }, [isOpen]);

  useEffect(() => {
    const handleCloseEvent = () => {
      setIsOpen(false);
      safeBack();
    };

    window.addEventListener("close-portfolio-modal", handleCloseEvent);
    return () => {
      window.removeEventListener("close-portfolio-modal", handleCloseEvent);
    };
  }, [safeBack]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) handleClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 cursor-pointer transition-all duration-300"
    >
      {children}
    </div>
  );
}
