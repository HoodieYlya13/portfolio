"use client";

import { useSyncExternalStore } from "react";

const HEVC_WITH_ALPHA = "/memoji-video.mov";
const VP9_WITH_ALPHA = "/memoji-video.webm";

const neverChanges = () => () => {};

// Only WebKit draws HEVC's alpha; Firefox plays the .mov but on a black background, and WebKit draws VP9 without alpha.
function transparentVideoSource(): string {
  return navigator.vendor.startsWith("Apple") ? HEVC_WITH_ALPHA : VP9_WITH_ALPHA;
}

/** The looping memoji with a transparent background in every browser. */
export default function MemojiVideo() {
  const source = useSyncExternalStore(neverChanges, transparentVideoSource, () => undefined);
  return <video src={source} autoPlay loop muted playsInline className="size-full object-cover object-center" />;
}
