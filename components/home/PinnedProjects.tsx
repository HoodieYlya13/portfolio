import Link from "next/link";
import { getGithubData } from "@/lib/github";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/button";
import ResumeButton from "@/components/layout/ResumeButton";
import { FolderGit2, Briefcase, FileText } from "lucide-react";

export async function PinnedProjects() {
  const { pinnedRepositories, isLive } = await getGithubData();

  if (!pinnedRepositories || pinnedRepositories.length === 0) return null;

  return (
    <section className="pt-16 max-w-6xl mx-auto px-6">
      <div className="flex flex-col items-center text-center gap-4 mb-10 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Featured Projects
        </h2>

        <div>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${
              isLive
                ? "bg-apple-green/10 text-apple-green border-apple-green/20"
                : "bg-primary/10 text-primary border-primary/20"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isLive
                  ? "bg-apple-green animate-pulse"
                  : "bg-primary"
              }`}
            />
            {isLive ? "Live Sync" : "Cached Static"}
          </span>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed mt-1">
          Flagship applications dynamically synchronized from my GitHub
          overview, showcasing clean code and modern architectures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pinnedRepositories.map((repo) => (
          <ProjectCard key={repo.name} repo={repo} />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16 pt-6 border-t border-border/50 max-w-2xl mx-auto">
        <Button
          asChild
          variant="default"
          size="lg"
          className="w-full sm:w-auto min-h-11 px-6 rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 font-semibold shadow-xs shadow-primary/10 cursor-pointer"
        >
          <Link
            href="/projects"
            className="flex items-center justify-center gap-2"
          >
            <FolderGit2 className="w-4 h-4" />
            <span>See all my projects</span>
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          size="lg"
          className="w-full sm:w-auto min-h-11 px-6 rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 font-semibold cursor-pointer"
        >
          <Link
            href="/experience"
            className="flex items-center justify-center gap-2"
          >
            <Briefcase className="w-4 h-4" />
            <span>View my career</span>
          </Link>
        </Button>

        <ResumeButton
          variant="outline"
          size="lg"
          icon={FileText}
          className="w-full sm:w-auto min-h-11 px-6 rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 font-semibold cursor-pointer"
        >
          View my resume
        </ResumeButton>
      </div>
    </section>
  );
}
