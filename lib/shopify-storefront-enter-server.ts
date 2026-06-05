import { type ShopifyStorefrontHost } from "./shopify-storefront-previews";

const STOREFRONT_PASSWORDS: Record<ShopifyStorefrontHost, string> = {
  "schumacher-knepper-v2.myshopify.com":
    process.env.SHOPIFY_SCHUMACHER_KNEPPER_PASSWORD ?? "123",
};

export function getShopifyStorefrontPassword(host: ShopifyStorefrontHost): string {
  return STOREFRONT_PASSWORDS[host];
}

export function getShopifyStorefrontOrigin(host: ShopifyStorefrontHost): string {
  return `https://${host}`;
}

const AUTHENTICITY_TOKEN_RE =
  /name="authenticity_token"\s+value="([^"]+)"/;

export async function fetchShopifyPasswordAuthenticityToken(
  origin: string,
): Promise<string> {
  const response = await fetch(`${origin}/password`, {
    headers: { Accept: "text/html" },
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`Failed to load Shopify password page (${response.status})`);

  const html = await response.text();
  const match = html.match(AUTHENTICITY_TOKEN_RE);
  if (!match?.[1]) throw new Error("Could not find Shopify authenticity token");

  return match[1];
}
