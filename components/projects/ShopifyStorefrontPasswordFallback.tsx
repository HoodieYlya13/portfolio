// TODO: style this

import type { ShopifyStorefrontHost } from "@/lib/shopify-storefront-previews";
import { getShopifyStorefrontOrigin, getShopifyStorefrontPassword } from "@/lib/shopify-storefront-enter-server";

interface ShopifyStorefrontPasswordFallbackProps {
  host: ShopifyStorefrontHost;
}

export function ShopifyStorefrontPasswordFallback({
  host,
}: ShopifyStorefrontPasswordFallbackProps) {
  const origin = getShopifyStorefrontOrigin(host);
  const password = getShopifyStorefrontPassword(host);

  return (
    <p className="mt-2 text-gray-600 dark:text-gray-400">
      If the store does not open, go to{" "}
      <a
        href={`${origin}/password`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline dark:text-blue-400"
      >
        {origin}/password
      </a>{" "}
      and enter password{" "}
      <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-gray-900 dark:bg-gray-800 dark:text-gray-100">
        {password}
      </code>
      .
    </p>
  );
}
