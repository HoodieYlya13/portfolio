import DotField from "@/components/education/DotField";
import HomeHero from "@/components/home/HomeHero";
import { PinnedProjects } from "@/components/home/PinnedProjects";

export default function Page() {
  const fadeHeight = 12;

  return (
    <div
      className="flex flex-col"
      style={
        {
          "--fade-height": `${fadeHeight}rem`,
        } as React.CSSProperties
      }
    >
      <div className="relative flex items-center justify-center min-h-dynamic pb-(--fade-height) -mb-(--fade-height)">
        <HomeHero fadeHeight={fadeHeight} />
      </div>

      <div className="relative flex items-center justify-center text-center min-h-screen min-h-svh padding-footer pt-(--fade-height)">
        <div id="classic-background" className="absolute top-(--fade-height)" />

        <DotField fadeTop />

        <PinnedProjects />
      </div>
    </div>
  );
}
