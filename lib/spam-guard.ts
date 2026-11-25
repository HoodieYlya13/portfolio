import "server-only";
import { checkRateLimit, isRepeatSubmission, RateLimitError } from "@/lib/ratelimit";
import { isCaptchaEnabled, verifyTurnstileToken } from "@/lib/turnstile";
import { tryCatch } from "@/lib/utils";

const MIN_HUMAN_FILL_MS = 3000;

export type SpamGuardRejection = { success: false; error: string; requiresCaptcha?: boolean };

/**
 * The checks every public form runs before sending mail: the IP rate limit,
 * then a Turnstile challenge for a form filled too fast or sent again within a
 * minute. Null when the submission may go on.
 */
export async function guardAgainstSpam({
  form,
  elapsedMs,
  captchaToken,
  rateLimitMessage,
}: {
  form: string;
  elapsedMs?: number;
  captchaToken?: string;
  rateLimitMessage: string;
}): Promise<SpamGuardRejection | null> {
  const [rateLimitError] = await tryCatch(checkRateLimit(form));
  if (rateLimitError) {
    if (rateLimitError instanceof RateLimitError) return { success: false, error: rateLimitMessage };
    throw rateLimitError;
  }

  if (!isCaptchaEnabled()) return null;

  const isTooFast = elapsedMs === undefined || elapsedMs < MIN_HUMAN_FILL_MS;
  const [, isRepeat] = await tryCatch(isRepeatSubmission(form));
  if (!isTooFast && isRepeat !== true) return null;

  if (!captchaToken)
    return { success: false, requiresCaptcha: true, error: "Please complete the verification to continue." };

  const [verifyError, isValid] = await tryCatch(verifyTurnstileToken(captchaToken));
  if (verifyError || !isValid)
    return { success: false, requiresCaptcha: true, error: "Verification failed. Please try again." };

  return null;
}
