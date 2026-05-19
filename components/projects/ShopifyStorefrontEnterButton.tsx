// TODO: style this

import {
  SHOPIFY_STOREFRONT_PREVIEWS,
  type ShopifyStorefrontHost,
} from "@/lib/shopify-storefront-previews";
import { getShopifyStorefrontOrigin } from "@/lib/shopify-storefront-enter-server";
import { ShopifyPasswordEnterForm } from "@/components/projects/ShopifyPasswordEnterForm";

interface ShopifyStorefrontEnterButtonProps {
  host: ShopifyStorefrontHost;
  className?: string;
  label?: string;
}

export async function ShopifyStorefrontEnterButton({
  host,
  className,
  label = "Open Live Demo ↗",
}: ShopifyStorefrontEnterButtonProps) {
  const siteLabel = SHOPIFY_STOREFRONT_PREVIEWS[host].siteLabel;
  const origin = getShopifyStorefrontOrigin(host);

  return (
    <ShopifyPasswordEnterForm
      host={host}
      errorFallback={
        <a
          href={`${origin}/password`}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          title={`${siteLabel} — use password if prompted`}
        >
          {label}
        </a>
      }
    >
      <button type="submit" className={className}>
        {label}
      </button>
    </ShopifyPasswordEnterForm>
  );
}
