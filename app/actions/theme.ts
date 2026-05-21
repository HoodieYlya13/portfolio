"use server";

import { cookies } from "next/headers";

export async function toggleTheme() {
  const cookieStore = await cookies();
  const currentTheme = cookieStore.get("theme")?.value || "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  cookieStore.set("theme", newTheme, {
    path: "/",
    maxAge: 31536000, // 1 year
    sameSite: "lax",
  });
}
