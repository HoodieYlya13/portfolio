import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { DEFAULT_LOCALE } from "./utils/config";
import { SUPPORTED_LOCALES } from "./i18n/utils";
import {
  getProxyCookie,
  setProxyCookie,
} from "./utils/cookies/cookiesProxy";

const intlMiddleware = createMiddleware(routing);

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const res = intlMiddleware(req);

  const pathLocale = pathname.split("/")[1];
  let preferredLocale = getProxyCookie(req, "preferred_locale");

  if (!preferredLocale) {
    const acceptLang = req.headers.get("accept-language");
    const browserLocale =
      acceptLang?.split(",")[0]?.split("-")[0]?.trim() || DEFAULT_LOCALE;
    const isSupportedLocale =
      browserLocale &&
      (SUPPORTED_LOCALES as readonly string[]).includes(browserLocale);
    if (isSupportedLocale)
      setProxyCookie(res, "preferred_locale", browserLocale, {
        httpOnly: false,
      });

    preferredLocale = browserLocale;
  }

  if (
    pathLocale &&
    (SUPPORTED_LOCALES as readonly string[]).includes(pathLocale) &&
    preferredLocale &&
    pathLocale !== preferredLocale
  ) {
    setProxyCookie(res, "locale_mismatch", pathLocale, {
      httpOnly: false,
    });
  }

  return res;
}

export const config = {
  matcher: ["/api/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};