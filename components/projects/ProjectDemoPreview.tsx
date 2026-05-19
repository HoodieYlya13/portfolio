// TODO: style this

import { Suspense } from "react";
import IframeDesktopPreview from "@/components/projects/IframeDesktopPreview";
import { ShopifyStaticStorePreview } from "@/components/projects/ShopifyStaticStorePreview";
import { getShopifyStorefrontHost } from "@/lib/shopify-storefront-previews";

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
          <div className="h-48 animate-pulse rounded-lg border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900" />
        }
      >
        <ShopifyStaticStorePreview host={shopifyHost} title={title} />
      </Suspense>
    );

  return <IframeDesktopPreview src={src} title={title} />;
}
