import HomeHero from "@/components/home/HomeHero";

export default function Page() {
  const fadeHeight = 12;

  return (
    <div className="flex flex-col padding-footer">
      <div
        className="relative flex items-center justify-center min-h-dynamic pb-(--fade-height)"
        style={{ "--fade-height": `${fadeHeight}rem` } as React.CSSProperties}
      >
        <HomeHero fadeHeight={fadeHeight} />
      </div>

      <div
        id="classic-background"
        className="relative flex items-center justify-center text-center h-60 scroll-mt-8"
      >
        PLACEHOLDER 2
      </div>
    </div>
  );
}
