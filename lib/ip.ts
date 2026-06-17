import "server-only";
import { headers } from "next/headers";

function isValidIp(ip: string): boolean {
  const ipv4Regex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6Regex =
    /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::([0-9a-fA-F]{1,4}:){0,6}[0-9a-fA-F]{1,4}$|^([0-9a-fA-F]{1,4}:){1,7}:$/;

  return (
    ipv4Regex.test(ip) ||
    ipv6Regex.test(ip) ||
    ip === "::1" ||
    ip === "127.0.0.1"
  );
}

export async function getClientIp(): Promise<string> {
  const headerList = await headers();

  const ipSources = [
    headerList.get("x-real-ip"),
    headerList.get("x-forwarded-for"),
    headerList.get("x-client-ip"),
    headerList.get("x-vercel-forwarded-for"),
    headerList.get("cf-connecting-ip"),
    headerList.get("fastly-client-ip"),
    headerList.get("true-client-ip"),
  ];

  for (const ip of ipSources)
    if (ip) {
      const firstIp = ip.split(",")[0]?.trim();
      if (firstIp && isValidIp(firstIp)) return firstIp;
    }

  return "unknown";
}
