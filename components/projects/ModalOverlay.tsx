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

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
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
