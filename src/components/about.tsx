export function About() {
  return (
    <section id="about" className="py-24 container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl font-bold tracking-tighter">About Me</h2>
          <p className="text-muted-foreground leading-relaxed">
            I am a full-stack developer with a passion for building beautiful
            and functional applications. I specialize in React, Next.js, and
            TypeScript. I have experience working with modern web technologies
            and ensuring that the applications I build are accessible and
            performant.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            When I am not coding, you can find me exploring new technologies,
            contributing to open source, or enjoying a good cup of coffee.
          </p>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-tr from-primary to-secondary opacity-20 blur-3xl" />
          {/* Placeholder for an image or graphic */}
          <div className="absolute w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-muted border flex items-center justify-center text-muted-foreground">
            Profile Image
          </div>
        </div>
      </div>
    </section>
  );
}
