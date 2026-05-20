"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const LEFT_HOME_KEY = "portfolio:left-home";

export function useRouteRestartKey(route = "/") {
  const pathname = usePathname();
  const prevPathname = useRef<string | null>(null);
  const [restartKey, setRestartKey] = useState(0);

  useEffect(() => {
    if (
      prevPathname.current !== null &&
      prevPathname.current !== route &&
      pathname === route
    )
      setRestartKey((key) => key + 1);

    prevPathname.current = pathname;
  }, [pathname, route]);

  useEffect(() => {
    if (sessionStorage.getItem(LEFT_HOME_KEY) === "1") {
      sessionStorage.removeItem(LEFT_HOME_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRestartKey((key) => key + 1);
    }

    return () => {
      sessionStorage.setItem(LEFT_HOME_KEY, "1");
    };
  }, []);

  return restartKey;
}
