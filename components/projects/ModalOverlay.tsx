// TODO: style this

"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

interface ModalOverlayProps {
  children: React.ReactNode;
}

export default function ModalOverlay({ children }: ModalOverlayProps) {
  const router = useRouter();
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
    const handleCloseEvent = () => {
      setIsOpen(false);
      router.back();
    };

    window.addEventListener("close-portfolio-modal", handleCloseEvent);
    return () => {
      window.removeEventListener("close-portfolio-modal", handleCloseEvent);
    };
  }, [router]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) handleClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center z-50 p-4 overflow-y-auto cursor-pointer transition-all duration-300"
    >
      <div className="cursor-default w-full max-w-4xl my-auto py-8">
        {children}
      </div>
    </div>
  );
}
