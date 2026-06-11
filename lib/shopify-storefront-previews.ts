import { tryCatchSync } from "@/lib/utils";

export const SHOPIFY_STOREFRONT_PREVIEWS = {
  "schumacher-knepper-v2.myshopify.com": {
    imageSrc: "/img/schumacher-knepper.png",
    siteLabel: "Schumacher-Knepper",
  },
} as const;

export type ShopifyStorefrontHost = keyof typeof SHOPIFY_STOREFRONT_PREVIEWS;

export function getShopifyStorefrontHost(
  src: string,
): ShopifyStorefrontHost | undefined {
  const [error, url] = tryCatchSync(() => new URL(src));
  if (!error && url) {
    const host = url.hostname.toLowerCase();
    if (host in SHOPIFY_STOREFRONT_PREVIEWS)
      return host as ShopifyStorefrontHost;
  }
  return undefined;
}
