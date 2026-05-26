import { Suspense } from "react";
import IframeDesktopPreview from "@/components/projects/IframeDesktopPreview";
import { ShopifyStaticStorePreview } from "@/components/projects/ShopifyStaticStorePreview";
import { getShopifyStorefrontHost } from "@/lib/shopify-storefront-previews";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

interface ProjectDemoPreviewProps {
  src: string;
  title: string;
}

export function ProjectDemoPreview({ src, title }: ProjectDemoPreviewProps) {
  const shopifyHost = getShopifyStorefrontHost(src);

  if (shopifyHost)
    return (
      <Suspense
        fallback={
          <div className="w-full overflow-hidden bg-card border border-border/80 rounded-2xl animate-pulse">
            <div className="w-full aspect-[4112/2336] flex items-center justify-center bg-muted/20">
              <LoadingSpinner spinnerClassName="size-8" />
            </div>
            <div className="h-[52px] bg-muted/10 border-t border-border/30 flex items-center justify-center">
              <div className="h-4 w-3/4 bg-foreground/5 rounded" />
            </div>
            <div className="h-[116px] border-t border-border/60 bg-muted/20 p-5 space-y-3">
              <div className="h-4 w-5/6 bg-foreground/5 rounded" />
              <div className="h-4 w-2/3 bg-foreground/5 rounded" />
            </div>
          </div>
        }
      >
        <ShopifyStaticStorePreview host={shopifyHost} title={title} />
      </Suspense>
    );

  return <IframeDesktopPreview src={src} title={title} />;
}
