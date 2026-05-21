// TODO: style this

import { getGithubData } from "@/lib/github";
import { Folder, Star, GitFork, ArrowUpRight } from "lucide-react";

export async function PinnedProjects() {
  const { pinnedRepositories, isLive } = await getGithubData();

  if (!pinnedRepositories || pinnedRepositories.length === 0) {
    return null;
  }

  return (
    <section className="py-12 max-w-6xl mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-100">
            Featured Projects
          </h2>
          <p className="text-neutral-400 mt-2 text-sm">
            Flagship applications dynamically synchronized from my GitHub
            overview.
          </p>
        </div>

        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
            isLive
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-amber-500/10 text-amber-400"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${isLive ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`}
          />
          {isLive ? "Live Sync" : "Cached Static"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pinnedRepositories.map((repo) => (
          <a
            key={repo.name}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col justify-between p-6 bg-neutral-900/50 border border-neutral-800 rounded-xl hover:border-neutral-700 hover:bg-neutral-900 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4 text-neutral-400 group-hover:text-neutral-200 transition-colors">
                <Folder className="w-6 h-6 stroke-[1.5]" />
                <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </div>

              <h3 className="text-lg font-semibold text-neutral-100 group-hover:text-blue-400 transition-colors duration-200">
                {repo.name}
              </h3>
              <p className="text-sm text-neutral-400 mt-2 line-clamp-3 leading-relaxed">
                {repo.description || "No description provided."}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800/60 flex items-center justify-between text-xs text-neutral-400 font-medium">
              {repo.language && (
                <span className="inline-flex items-center px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700/50">
                  {repo.language}
                </span>
              )}

              <div className="flex items-center gap-4">
                {repo.stargazers_count > 0 && (
                  <span className="flex items-center gap-1 hover:text-amber-400 transition-colors">
                    <Star className="w-4 h-4 fill-current text-amber-500/80" />
                    {repo.stargazers_count}
                  </span>
                )}
                {repo.forks_count > 0 && (
                  <span className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                    <GitFork className="w-4 h-4 text-neutral-500" />
                    {repo.forks_count}
                  </span>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
