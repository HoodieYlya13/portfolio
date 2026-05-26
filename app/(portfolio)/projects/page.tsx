import { Suspense } from "react";
import { getGithubData } from "@/lib/github";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { FolderGit2, Award } from "lucide-react";
import { GithubIcon } from "@/components/icons/Brands";

async function ProjectsContent() {
  const { profile, pinnedRepositories, honorableRepositories, repositories, isLive } = await getGithubData();

  return (
    <div className="space-y-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-foreground/10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary mb-2 block">
            Portfolio
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Projects & Repositories
          </h1>
          <p className="text-muted-foreground mt-3 text-sm md:text-base max-w-2xl leading-relaxed">
            Explore my digital workspace. Here you&apos;ll find flagship full-stack web applications, compiled WebAssembly tools, open-source libraries, and experimental side-projects.
          </p>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-xs text-muted-foreground font-medium">
            <span className="flex items-center gap-1.5">
              <strong>Total Public Repositories:</strong> {profile.public_repos}
            </span>
            <span className="hidden sm:inline text-foreground/20">•</span>
            <span className="flex items-center gap-1.5">
              <strong>Followers:</strong> {profile.followers}
            </span>
            <span className="hidden sm:inline text-foreground/20">•</span>
            <a 
              href={profile.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1 text-primary hover:underline font-semibold"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>github.com/{profile.username}</span>
            </a>
          </div>
        </div>

        <div className="self-start md:self-end">
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
      </div>

      {pinnedRepositories && pinnedRepositories.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Featured Work
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pinnedRepositories.map((repo) => (
              <ProjectCard key={repo.name} repo={repo} />
            ))}
          </div>
        </section>
      )}

      {honorableRepositories && honorableRepositories.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Honorable Mentions
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {honorableRepositories.map((repo) => (
              <ProjectCard key={repo.name} repo={repo} />
            ))}
          </div>
        </section>
      )}

      {repositories && repositories.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <GithubIcon className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Other Repositories ({repositories.length})
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repositories.map((repo) => (
              <ProjectCard key={repo.name} repo={repo} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function ProjectsLoadingFallback() {
  return (
    <div className="space-y-12 animate-pulse">
      <div className="space-y-4 pb-8 border-b border-foreground/10">
        <div className="h-4 w-24 bg-foreground/10 rounded" />
        <div className="h-10 w-2/3 bg-foreground/15 rounded" />
        <div className="h-4 w-full md:w-1/2 bg-foreground/10 rounded" />
      </div>

      <div className="space-y-6">
        <div className="h-6 w-32 bg-foreground/10 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div 
              key={i} 
              className="h-44 p-6 rounded-2xl border border-foreground/5 bg-card/10 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="h-6 w-1/2 bg-foreground/10 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-foreground/5 rounded animate-pulse" />
              </div>
              <div className="h-4 w-1/4 bg-foreground/10 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <section className="flex-1 flex flex-col w-full px-6 py-12 md:py-20 max-w-6xl mx-auto padding-footer">
      <Suspense fallback={<ProjectsLoadingFallback />}>
        <ProjectsContent />
      </Suspense>
    </section>
  );
}
