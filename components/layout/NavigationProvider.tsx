"use client";

import React, { useEffect, Suspense } from "react";
import { usePathname, useRouter } from "next/navigation";

import { tryCatchSync } from "@/lib/utils";

let inMemoryHistory: string[] = [];

function getHistory(): string[] {
  if (typeof window === "undefined") return [];
  const [error, history] = tryCatchSync(() => {
    const stored = sessionStorage.getItem("nav_history");
    return stored ? (JSON.parse(stored) as string[]) : inMemoryHistory;
  });
  return error ? inMemoryHistory : history;
}

function setHistory(history: string[]) {
  inMemoryHistory = history;
  if (typeof window === "undefined") return;
  const [error] = tryCatchSync(() => {
    sessionStorage.setItem("nav_history", JSON.stringify(history));
  });
  if (error) console.error("Failed to write nav_history:", error);
}

function NavigationTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const history = getHistory();
    if (history[history.length - 1] !== pathname)
      setHistory([...history, pathname]);
  }, [pathname]);

  return null;
}

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={null}>
        <NavigationTracker />
      </Suspense>
      {children}
    </>
  );
}

export function useSafeBack() {
  const router = useRouter();

  return (fallbackRoute: string = "/") => {
    const history = getHistory();
    if (history.length > 1) {
      const updated = history.slice(0, -1);
      setHistory(updated);
      router.back();
    } else router.push(fallbackRoute);
  };
}
