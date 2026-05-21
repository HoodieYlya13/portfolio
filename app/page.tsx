import DotField from "@/components/education/DotField";
import HomeHero from "@/components/home/HomeHero";

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

        <div className="absolute inset-0">
          <DotField
            dotRadius={1.5}
            dotSpacing={14}
            bulgeStrength={67}
            glowRadius={160}
            sparkle={false}
            waveAmplitude={0}
            gradientFrom="rgba(255, 100, 0, 0.6)"
            gradientTo="rgba(255, 50, 0, 0.2)"
            glowColor="rgba(255, 100, 0, 0.3)"
            fadeTop
          />
        </div>
        PLACEHOLDER 2
      </div>
    </div>
  );
}
