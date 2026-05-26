import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const response = NextResponse.next();

  const existingIp = req.cookies.get("user_ip")?.value;
  const existingCountry = req.cookies.get("user_country")?.value;
  if (!existingIp || !existingCountry) {
    const ip =
      req.headers.get("x-real-ip") ||
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      "unknown";
    const country = req.headers.get("x-vercel-ip-country") || "unknown";

    if (!existingIp) {
      response.cookies.set("user_ip", ip, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    // TODO: add metrics for ylya bot
    // FIXME: wrong country retreived
    if (!existingCountry) {
      response.cookies.set("user_country", country, {
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30,
      });
    }
  }

  return response;
}

export const config = {
  matcher: ["/api/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
