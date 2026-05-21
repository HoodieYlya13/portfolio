import DotField from "@/components/education/DotField";
import HomeHero from "@/components/home/HomeHero";
import { PinnedProjects } from "@/components/home/PinnedProjects";

export default function Page() {
  const fadeHeight = 12;
  const targetOffset = fadeHeight / 2;

  return (
    <div
      className="flex flex-col"
      style={
        {
          "--fade-height": `${fadeHeight}rem`,
          "--target-offset": `${targetOffset}rem`,
        } as React.CSSProperties
      }
    >
      <div className="relative flex items-center justify-center min-h-dynamic pb-(--fade-height) -mb-(--fade-height)">
        <HomeHero fadeHeight={fadeHeight} />
      </div>

      <div className="relative flex items-center justify-center text-center min-h-screen min-h-dvh padding-footer pt-(--fade-height)">
        <div
          id="classic-background"
          className="absolute top-(--target-offset)"
        />

        <DotField fadeTop />

        <PinnedProjects />
      </div>
    </div>
  );
}
