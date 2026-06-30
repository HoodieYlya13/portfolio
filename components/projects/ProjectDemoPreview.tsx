import { Suspense } from "react";
import IframeDesktopPreview from "@/components/projects/IframeDesktopPreview";
import { ShopifyStaticStorePreview } from "@/components/projects/ShopifyStaticStorePreview";
import { getShopifyStorefrontHost } from "@/lib/shopify-storefront-previews";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import VideoPreviewPlayer from "@/components/projects/VideoPreviewPlayer";
import { isVideoUrl } from "@/lib/utils";

interface ProjectDemoPreviewProps {
  src: string;
  title: string;
}

function getYouTubeEmbedUrl(url: string): string | null {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    const videoId = match[2];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1&enablejsapi=1`;
  }
  return null;
}

export function ProjectDemoPreview({ src, title }: ProjectDemoPreviewProps) {
  const shopifyHost = getShopifyStorefrontHost(src);

  if (shopifyHost)
    return (
      <Suspense
        fallback={
          <div className="w-full overflow-hidden bg-card border border-border/80 rounded-2xl animate-pulse">
            <div className="w-full aspect-4112/2336 flex items-center justify-center bg-muted/20">
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

  if (isVideoUrl(src)) return <VideoPreviewPlayer src={src} title={title} />;

  const ytEmbedUrl = getYouTubeEmbedUrl(src);
  if (ytEmbedUrl)
    return (
      <div className="w-full aspect-video bg-black overflow-hidden relative border border-border/40 rounded-2xl">
        <iframe
          src={ytEmbedUrl}
          title={title}
          className="w-full h-full border-none"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );

  return <IframeDesktopPreview src={src} title={title} />;
}
