import Link from "next/link";
import { Folder, Star, GitFork, ArrowUpRight } from "lucide-react";
import { Repository } from "@/lib/github";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  repo: Repository;
  className?: string;
}

export function ProjectCard({ repo, className }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${repo.name}`}
      scroll={false}
      className={cn(
        "group relative flex flex-col justify-between p-6 rounded-2xl transition-all duration-300",
        "bg-card/45 dark:bg-card/20 hover:bg-card/55 dark:hover:bg-card/30 backdrop-blur-none group-hover:backdrop-blur-xs",
        "border border-border/80 dark:border-border/40 hover:border-primary/40 dark:hover:border-primary/30",
        "shadow-xs hover:shadow-xl hover:shadow-primary/5",
        "hover:scale-[1.02] overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 dark:from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div>
        <div className="flex items-center justify-between mb-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300">
          <Folder className="w-6 h-6 stroke-[1.5] group-hover:text-primary transition-colors duration-300" />
          <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 text-primary" />
        </div>

        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-200">
          {repo.name}
        </h3>
        
        {repo.fork && (
          <span className="inline-block text-[10px] uppercase tracking-wider text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded-sm mt-1">
            Forked
          </span>
        )}

        <p className="text-sm text-muted-foreground mt-2 line-clamp-3 leading-relaxed">
          {repo.description || "No description provided."}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-foreground/5 flex items-center justify-between text-xs text-muted-foreground font-medium">
        {repo.language ? (
          <span className="inline-flex items-center px-2 py-0.5 rounded bg-muted/65 text-foreground/80 border border-border/40">
            {repo.language}
          </span>
        ) : (
          <span className="text-foreground/40 italic">Not specified</span>
        )}

        <div className="flex items-center gap-4">
          {repo.stargazers_count > 0 && (
            <span className="flex items-center gap-1 hover:text-amber-500 transition-colors">
              <Star className="w-4 h-4 fill-current text-amber-500/80" />
              {repo.stargazers_count}
            </span>
          )}
          {repo.forks_count > 0 && (
            <span className="flex items-center gap-1 hover:text-primary transition-colors">
              <GitFork className="w-4 h-4 text-muted-foreground/60 group-hover:text-primary/70 transition-colors" />
              {repo.forks_count}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
