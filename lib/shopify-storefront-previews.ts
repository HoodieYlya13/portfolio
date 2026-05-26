export const SHOPIFY_STOREFRONT_PREVIEWS = {
  "schumacher-knepper-v2.myshopify.com": {
    imageSrc: "/img/schumacher-knepper.png",
    siteLabel: "Schumacher-Knepper",
  },
} as const;

export type ShopifyStorefrontHost = keyof typeof SHOPIFY_STOREFRONT_PREVIEWS;

export function getShopifyStorefrontHost(src: string): ShopifyStorefrontHost | undefined {
  try {
    const host = new URL(src).hostname.toLowerCase();
    if (host in SHOPIFY_STOREFRONT_PREVIEWS) return host as ShopifyStorefrontHost;
  } catch {
    // ignore invalid URLs
  }
  return undefined;
}
