import "server-only";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  process.env.ANALYTICS_PASSWORD ||
  "ylyabot-fallback-secure-jwt-secret-string-2026";

function stringToBuffer(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

function bufferToBase64Url(buf: Uint8Array): string {
  const bin = String.fromCharCode(...buf);
  const base64 = btoa(bin);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToBuffer(str: string): Uint8Array {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) base64 += "=";
  const bin = atob(base64);
  const buf = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
  return buf;
}

async function getCryptoKey(): Promise<CryptoKey> {
  const secretBuf = stringToBuffer(JWT_SECRET);
  return crypto.subtle.importKey(
    "raw",
    secretBuf as unknown as ArrayBuffer,
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["sign", "verify"],
  );
}

export async function signJWT(
  payload: Record<string, unknown>,
  expiresInSeconds: number = 60 * 60 * 24,
): Promise<string> {
  const header = { alg: "HS256", typ: "JWT" };
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const fullPayload = { ...payload, exp };

  const headerStr = bufferToBase64Url(stringToBuffer(JSON.stringify(header)));
  const payloadStr = bufferToBase64Url(
    stringToBuffer(JSON.stringify(fullPayload)),
  );
  const dataToSign = `${headerStr}.${payloadStr}`;

  const key = await getCryptoKey();
  const signatureBuf = await crypto.subtle.sign(
    "HMAC",
    key,
    stringToBuffer(dataToSign) as unknown as ArrayBuffer,
  );
  const signatureStr = bufferToBase64Url(new Uint8Array(signatureBuf));

  return `${dataToSign}.${signatureStr}`;
}

export async function verifyJWT(
  token: string,
): Promise<Record<string, unknown> | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [headerStr, payloadStr, signatureStr] = parts;
    const dataToVerify = `${headerStr}.${payloadStr}`;

    const key = await getCryptoKey();
    const signatureBuf = base64UrlToBuffer(signatureStr);

    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBuf as unknown as ArrayBuffer,
      stringToBuffer(dataToVerify) as unknown as ArrayBuffer,
    );

    if (!isValid) return null;

    const decodedPayloadStr = new TextDecoder().decode(
      base64UrlToBuffer(payloadStr),
    );
    const payload = JSON.parse(decodedPayloadStr) as Record<string, unknown>;

    if (payload.exp && typeof payload.exp === "number" && Date.now() / 1000 > payload.exp) return null;

    return payload;
  } catch (err) {
    console.error("JWT Verification failed:", err);
    return null;
  }
}
