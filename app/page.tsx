import LiquidGlassBackground from "@/components/webgl/LiquidGlassBackground";

export default function Page() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <LiquidGlassBackground />
      <div className="relative z-10 text-center">
        {/* Content will go here */}
      </div>
    </div>
  );
}

