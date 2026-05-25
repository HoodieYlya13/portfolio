import {
  SHOPIFY_STOREFRONT_PREVIEWS,
  type ShopifyStorefrontHost,
} from "@/lib/shopify-storefront-previews";
import { getShopifyStorefrontOrigin } from "@/lib/shopify-storefront-enter-server";
import { ShopifyPasswordEnterForm } from "@/components/projects/ShopifyPasswordEnterForm";
import { ShopifyStorefrontPasswordFallback } from "@/components/projects/ShopifyStorefrontPasswordFallback";
import { ExternalLink, Sparkles, Info } from "lucide-react";

interface ShopifyStaticStorePreviewProps {
  host: ShopifyStorefrontHost;
  title: string;
}

function StaticPreviewImage({ siteLabel, imageSrc }: { siteLabel: string; imageSrc: string }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt={`${siteLabel} storefront preview`}
        className="block w-full h-auto"
      />
    </>
  );
}

export async function ShopifyStaticStorePreview({
  host,
  title,
}: ShopifyStaticStorePreviewProps) {
  const config = SHOPIFY_STOREFRONT_PREVIEWS[host];
  const siteLabel = config.siteLabel ?? title;
  const origin = getShopifyStorefrontOrigin(host);

  const enterErrorFallback = (
    <div className="px-4 py-4 bg-card text-foreground">
      <StaticPreviewImage siteLabel={siteLabel} imageSrc={config.imageSrc} />
      <p className="mt-3.5 text-center text-sm font-medium text-apple-orange/90">
        Auto-login is temporarily unavailable. Use the manual password below.
      </p>
    </div>
  );

  return (
    <div className="w-full overflow-hidden bg-card text-foreground">
      <ShopifyPasswordEnterForm
        className="block"
        host={host}
        errorFallback={enterErrorFallback}
      >
        <button
          type="submit"
          className="group block w-full cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label={`Open ${siteLabel} in a new tab`}
        >
          <div className="relative overflow-hidden group-hover:brightness-95 transition-all duration-300">
            <StaticPreviewImage siteLabel={siteLabel} imageSrc={config.imageSrc} />
          </div>
          <div className="px-4 py-3.5 bg-muted/10 border-t border-border/30 text-center text-xs sm:text-sm font-semibold text-primary group-hover:text-primary/80 dark:text-primary dark:group-hover:text-primary/80 transition-colors leading-relaxed">
            <Sparkles className="w-4 h-4 text-apple-orange animate-pulse inline-block mr-1.5 align-middle shrink-0" />
            <span className="align-middle">Click preview to open live storefront (password auto-filled)</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80 inline-block ml-1.5 align-middle shrink-0" />
          </div>
        </button>
      </ShopifyPasswordEnterForm>

      <div className="border-t border-border/60 px-5 py-4 text-xs sm:text-sm bg-muted/20">
        <div className="text-muted-foreground leading-relaxed">
          <Info className="w-4 h-4 text-muted-foreground/60 inline-block mr-1.5 align-text-bottom shrink-0" />
          <span>This Shopify store requires authentication and cannot be embedded here. Click preview above or </span>
          <ShopifyPasswordEnterForm
            host={host}
            className="inline"
            errorFallback={
              <a
                href={`${origin}/password`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:text-primary/80 inline-flex items-center gap-0.5 hover:underline"
              >
                <span>open {siteLabel}</span>
                <ExternalLink className="w-3 h-3 opacity-80 inline-block ml-0.5 align-middle" />
              </a>
            }
          >
            <button
              type="submit"
              className="font-semibold text-primary hover:text-primary/80 inline-flex items-center gap-0.5 hover:underline cursor-pointer"
            >
              <span>open {siteLabel}</span>
              <ExternalLink className="w-3 h-3 opacity-80 inline-block ml-0.5 align-middle" />
            </button>
          </ShopifyPasswordEnterForm>{" "}
          <span>directly in a new tab.</span>
        </div>
        <ShopifyStorefrontPasswordFallback host={host} />
      </div>
    </div>
  );
}
