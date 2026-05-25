import type { ShopifyStorefrontHost } from "@/lib/shopify-storefront-previews";
import { getShopifyStorefrontOrigin, getShopifyStorefrontPassword } from "@/lib/shopify-storefront-enter-server";
import { Lock, ExternalLink } from "lucide-react";

interface ShopifyStorefrontPasswordFallbackProps {
  host: ShopifyStorefrontHost;
}

export function ShopifyStorefrontPasswordFallback({
  host,
}: ShopifyStorefrontPasswordFallbackProps) {
  const origin = getShopifyStorefrontOrigin(host);
  const password = getShopifyStorefrontPassword(host);

  return (
    <div className="mt-3 pt-3 border-t border-border/40 text-muted-foreground text-xs sm:text-sm leading-relaxed">
      <Lock className="w-3.5 h-3.5 text-apple-orange/80 inline-block mr-1.5 align-text-bottom shrink-0" />
      <span>If auto-login fails, enter password </span>
      <code className="rounded bg-muted border border-border px-1.5 py-0.5 font-mono text-foreground font-semibold text-xs select-all inline-block mx-0.5">
        {password}
      </code>
      <span> at </span>
      <a
        href={`${origin}/password`}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-primary hover:text-primary/80 hover:underline inline-block break-all"
      >
        <span>{origin}/password</span>
        <ExternalLink className="w-3.5 h-3.5 inline-block ml-1 align-middle opacity-80" />
      </a>
    </div>
  );
}
