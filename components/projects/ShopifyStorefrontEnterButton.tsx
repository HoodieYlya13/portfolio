import {
  SHOPIFY_STOREFRONT_PREVIEWS,
  type ShopifyStorefrontHost,
} from "@/lib/shopify-storefront-previews";
import { getShopifyStorefrontOrigin } from "@/lib/shopify-storefront-enter-server";
import { ShopifyPasswordEnterForm } from "@/components/projects/ShopifyPasswordEnterForm";
import { Globe, ExternalLink } from "lucide-react";

interface ShopifyStorefrontEnterButtonProps {
  host: ShopifyStorefrontHost;
  className?: string;
  label?: string;
}

export async function ShopifyStorefrontEnterButton({
  host,
  className,
  label = "Open Live Demo",
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
          <Globe className="w-4 h-4" />
          <span>{label}</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-80" />
        </a>
      }
    >
      <button type="submit" className={className}>
        <Globe className="w-4 h-4" />
        <span>{label}</span>
        <ExternalLink className="w-3.5 h-3.5 opacity-80" />
      </button>
    </ShopifyPasswordEnterForm>
  );
}
