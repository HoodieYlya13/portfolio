"use client";

import LiquidGlassBackground from "@/components/webgl/LiquidGlassBackground";
import HeroIntro from "@/components/home/HeroIntro";
import { useRouteRestartKey } from "@/lib/hooks/useRouteRestartKey";

interface HomeHeroProps {
  fadeHeight: number;
}

export default function HomeHero({ fadeHeight }: HomeHeroProps) {
  const restartKey = useRouteRestartKey();

  return (
    <>
      <LiquidGlassBackground
        fadeHeight={fadeHeight}
        invertFade
        animateIn
        restartKey={restartKey}
      />
      <HeroIntro restartKey={restartKey} />
    </>
  );
}
