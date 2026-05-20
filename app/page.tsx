import LiquidGlassBackground from "@/components/webgl/LiquidGlassBackground";

export default function Page() {
  const bottomFadeHeight = 12;

  return (
    <div className="flex flex-col pb-40">
      <div
        className="relative flex items-center justify-center min-h-dynamic"
        style={
          { "--fade-height": `${bottomFadeHeight}rem` } as React.CSSProperties
        }
      >
        <LiquidGlassBackground bottomFadeHeight={bottomFadeHeight} />
        <div className="relative text-center">HERO PLACEHOLDER</div>
      </div>

      <div className="relative flex items-center justify-center text-center h-60">
        PLACEHOLDER 2
      </div>
    </div>
  );
}
