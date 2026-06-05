import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { cookies } from "next/headers";

function getRedisClient() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "⚠️ UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN not found. Rate limiting will be disabled.",
      );
      return null;
    }

    throw new Error(
      "UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN are required in production.",
    );
  }

  return new Redis({
    url,
    token,
  });
}

function getLimiter(identifier: string, redis: Redis) {
  switch (identifier) {
    case "chatbot":
      return new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(10, "1 m"),
      });
    case "contact":
      return new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(2, "1 m"),
      });
    default:
      return new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(60, "1 m"),
      });
  }
}

async function getUserIp() {
  const cookieStore = await cookies();
  return cookieStore.get("user_ip")?.value || "unknown";
}

export async function checkRateLimit(identifier: string) {
  const redis = getRedisClient();
  if (!redis) return;

  const ip = await getUserIp();
  const limiter = getLimiter(identifier, redis);
  const { success } = await limiter.limit(`${identifier}-${ip}`);

  if (!success) throw new Error("TOO_MANY_REQUESTS");
}
