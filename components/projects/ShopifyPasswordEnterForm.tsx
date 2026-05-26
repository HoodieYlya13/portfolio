import { unstable_noStore as noStore } from "next/cache";
import {
  fetchShopifyPasswordAuthenticityToken,
  getShopifyStorefrontOrigin,
  getShopifyStorefrontPassword,
} from "@/lib/shopify-storefront-enter-server";
import type { ShopifyStorefrontHost } from "@/lib/shopify-storefront-previews";

interface ShopifyPasswordEnterFormProps {
  host: ShopifyStorefrontHost;
  className?: string;
  errorFallback?: React.ReactNode;
  children: React.ReactNode;
}

async function loadAuthenticityToken(origin: string): Promise<string | null> {
  try {
    return await fetchShopifyPasswordAuthenticityToken(origin);
  } catch {
    return null;
  }
}

export async function ShopifyPasswordEnterForm({
  host,
  className,
  errorFallback = null,
  children,
}: ShopifyPasswordEnterFormProps) {
  noStore();

  const origin = getShopifyStorefrontOrigin(host);
  const authenticityToken = await loadAuthenticityToken(origin);

  if (!authenticityToken) return errorFallback;

  return (
    <form
      action={`${origin}/password`}
      method="post"
      target="_blank"
      rel="noopener"
      className={className}
    >
      <input type="hidden" name="authenticity_token" value={authenticityToken} />
      <input type="hidden" name="password" value={getShopifyStorefrontPassword(host)} />
      {children}
    </form>
  );
}
