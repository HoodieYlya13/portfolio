// TODO: style this

import {
  SHOPIFY_STOREFRONT_PREVIEWS,
  type ShopifyStorefrontHost,
} from "@/lib/shopify-storefront-previews";
import { getShopifyStorefrontOrigin } from "@/lib/shopify-storefront-enter-server";
import { ShopifyPasswordEnterForm } from "@/components/projects/ShopifyPasswordEnterForm";
import { ShopifyStorefrontPasswordFallback } from "@/components/projects/ShopifyStorefrontPasswordFallback";

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
    <div className="px-4 py-3">
      <StaticPreviewImage siteLabel={siteLabel} imageSrc={config.imageSrc} />
      <p className="mt-3 text-center text-sm text-amber-700 dark:text-amber-400">
        Auto-login is temporarily unavailable. Use the manual password below.
      </p>
    </div>
  );

  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <ShopifyPasswordEnterForm
        className="block"
        host={host}
        errorFallback={enterErrorFallback}
      >
        <button
          type="submit"
          className="group block w-full cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          aria-label={`Open ${siteLabel} in a new tab`}
        >
          <StaticPreviewImage siteLabel={siteLabel} imageSrc={config.imageSrc} />
          <p className="px-4 py-3 text-center text-sm font-medium text-blue-600 group-hover:underline dark:text-blue-400">
            Click preview to open live demo (password entered automatically) ↗
          </p>
        </button>
      </ShopifyPasswordEnterForm>

      <div className="border-t border-gray-200 px-4 py-3 text-sm dark:border-gray-800">
        <div className="text-gray-600 dark:text-gray-400">
          This Shopify store cannot be embedded here. Use the preview above or{" "}
          <ShopifyPasswordEnterForm
            host={host}
            className="inline"
            errorFallback={
              <a
                href={`${origin}/password`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                open {siteLabel}
              </a>
            }
          >
            <button
              type="submit"
              className="font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              open {siteLabel}
            </button>
          </ShopifyPasswordEnterForm>{" "}
          in a new tab.
        </div>
        <ShopifyStorefrontPasswordFallback host={host} />
      </div>
    </div>
  );
}
