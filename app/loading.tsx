export default function Loading() {
  return (
    <section className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="relative size-16">
          <div className="absolute inset-0 border-4 border-foreground/10 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-foreground border-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </section>
  );
}
