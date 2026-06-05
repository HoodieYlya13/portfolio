"use client";

import { useThemeObserver } from "@/lib/hooks/useThemeObserver";
import { Toaster as SonnerToaster } from "sonner";

export default function ThemeToaster() {
  const theme = useThemeObserver();

  return <SonnerToaster theme={theme} richColors position="top-center" />;
}
