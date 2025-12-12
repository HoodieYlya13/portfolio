import {
  DEFAULT_LOCALE_UPPERCASE,
  LocaleLanguages,
  LocaleLanguagesUpperCase,
} from "@/i18n/utils";
import { DEFAULT_LOCALE } from "@/utils/config";
import { cookies } from "next/headers";

export async function setServerCookie(
  name: string,
  value: string,
  options: Partial<{
    maxAge?: number;
    path?: string;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: "lax" | "strict" | "none";
  }> = {}
) {
  (await cookies()).set({
    name,
    value,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
    ...options,
  });
}

export async function getServerCookie(
  name: string
): Promise<string | undefined> {
  return (await cookies()).get(name)?.value;
}

export async function getServerCookies(): Promise<string> {
  return (await cookies()).toString();
}

export async function deleteServerCookie(name: string) {
  (await cookies()).delete(name);
}

export async function deleteServerCookies(names: string[]) {
  const cookieStore = await cookies();
  for (const name of names) cookieStore.delete(name);
}

export async function getPreferredLocale(toUpperCase = false) {
  const locale = await getServerCookie("preferred_locale");
  return toUpperCase
    ? ((locale?.toUpperCase() ||
        DEFAULT_LOCALE_UPPERCASE) as LocaleLanguagesUpperCase)
    : ((locale || DEFAULT_LOCALE) as LocaleLanguages);
}

export async function getUserCountry() {
  const country = await getServerCookie("user_country");

  if (!country || country === "unknown") return undefined;

  return country as LocaleLanguagesUpperCase;
}

export async function getUserIp(): Promise<string | undefined> {
  return getServerCookie("user_ip");
}
