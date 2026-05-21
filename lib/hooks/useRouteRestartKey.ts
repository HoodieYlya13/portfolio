"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const LEFT_HOME_KEY = "portfolio:left-home";

export function useRouteRestartKey(route = "/") {
  const pathname = usePathname();
  const prevPathname = useRef<string | null>(null);
  const [restartKey, setRestartKey] = useState(0);

  useEffect(() => {
    let shouldRestart = false;

    if (
      prevPathname.current !== null &&
      prevPathname.current !== route &&
      pathname === route
    )
      shouldRestart = true;

    prevPathname.current = pathname;

    if (sessionStorage.getItem(LEFT_HOME_KEY) === "1") {
      sessionStorage.removeItem(LEFT_HOME_KEY);
      shouldRestart = true;
    }

    if (shouldRestart) setRestartKey((key) => key + 1);
  }, [pathname, route]);

  useEffect(() => {
    return () => {
      sessionStorage.setItem(LEFT_HOME_KEY, "1");
    };
  }, []);

  return restartKey;
}
