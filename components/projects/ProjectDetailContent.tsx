import {
  ArrowRight,
  ExternalLink,
  Calendar,
  Code2,
  Star,
  GitFork,
  Globe,
} from "lucide-react";
import { GithubIcon } from "@/components/icons/Brands";
import { ShopifyStorefrontEnterButton } from "@/components/projects/ShopifyStorefrontEnterButton";
import { getShopifyStorefrontHost } from "@/lib/shopify-storefront-previews";
import MockBrowserWrapper from "@/components/projects/MockBrowserWrapper";
import { ProjectDemoPreview } from "@/components/projects/ProjectDemoPreview";
import { Repository } from "@/lib/github";

interface ProjectDetailContentProps {
  repo: Repository;
  isLive: boolean;
  isModal?: boolean;
}

export function ProjectDetailContent({
  repo,
  isLive,
  isModal = false,
}: ProjectDetailContentProps) {
  let projectUrl = repo.homepage || null;

  if (!projectUrl && repo.description) {
    const urlRegex = /(https?:\/\/[^\s"'`,;)]+)/g;
    const match = repo.description.match(urlRegex);
    if (match) projectUrl = match[0];
  }

  const shopifyHost = projectUrl
    ? getShopifyStorefrontHost(projectUrl)
    : undefined;

  return (
    <div className="space-y-10 text-foreground text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/60">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
            {repo.name}
          </h1>
          {repo.fork && (
            <span className="inline-flex items-center gap-1 mt-2 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded border border-border/40">
              <GitFork className="w-3 h-3" />
              <span>Forked Repository</span>
            </span>
          )}
        </div>

        <div>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
              isLive
                ? "bg-apple-green/10 text-apple-green border-apple-green/20"
                : "bg-primary/10 text-primary border-primary/20"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isLive ? "bg-apple-green animate-pulse" : "bg-primary"
              }`}
            />
            {isLive ? "Live Sync Active" : "Fallback Offline Data"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {repo.description ? (
              <p className="text-base md:text-lg leading-relaxed text-foreground/80 font-medium">
                {repo.description}
              </p>
            ) : (
              <p className="italic text-muted-foreground text-sm">
                No description provided for this repository.
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-foreground/10 hover:border-foreground/20 bg-card/45 dark:bg-card/10 text-foreground hover:bg-muted font-semibold transition-all duration-300 rounded-xl text-sm cursor-pointer"
            >
              <GithubIcon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span>View on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>

            {projectUrl && shopifyHost && (
              <ShopifyStorefrontEnterButton
                host={shopifyHost}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] shadow-xs hover:shadow-primary/10 transition-all duration-300 font-semibold rounded-xl text-sm cursor-pointer"
              />
            )}
            {projectUrl && !shopifyHost && (
              <a
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] shadow-xs hover:shadow-primary/10 transition-all duration-300 font-semibold rounded-xl text-sm cursor-pointer"
              >
                <Globe className="w-4 h-4" />
                <span>Open Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            )}

            {isModal && (
              <a
                href={`/projects/${repo.name}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-foreground/10 hover:border-foreground/20 bg-card/45 dark:bg-card/10 text-foreground hover:bg-muted font-semibold transition-all duration-300 rounded-xl text-sm cursor-pointer"
              >
                <span>Go to Full Page</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </a>
            )}
          </div>
        </div>

        <div className="bg-card/25 dark:bg-card/15 backdrop-blur-md p-6 rounded-2xl border border-foreground/10 dark:border-foreground/5 shadow-xs space-y-4">
          <h3 className="text-md font-bold text-foreground border-b border-foreground/10 pb-2.5 flex items-center gap-2">
            <Code2 className="w-4 h-4 text-primary" />
            <span>Specifications</span>
          </h3>

          <ul className="space-y-3.5 text-sm text-muted-foreground">
            <li className="flex justify-between items-center gap-4">
              <span className="font-semibold text-foreground/70">Language</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded bg-muted text-foreground/80 border border-border/40 font-medium text-xs">
                {repo.language || "Not specified"}
              </span>
            </li>
            <li className="flex justify-between items-center">
              <span className="font-semibold text-foreground/70">Stars</span>
              <span className="flex items-center gap-1 text-foreground font-semibold">
                <Star className="w-4 h-4 fill-current text-apple-yellow" />
                {repo.stargazers_count}
              </span>
            </li>
            <li className="flex justify-between items-center">
              <span className="font-semibold text-foreground/70">Forks</span>
              <span className="flex items-center gap-1 text-foreground font-semibold">
                <GitFork className="w-4 h-4 text-primary/80" />
                {repo.forks_count}
              </span>
            </li>
            <li className="flex justify-between items-center">
              <span className="font-semibold text-foreground/70">
                Last Updated
              </span>
              <span className="flex items-center gap-1 text-foreground font-semibold text-xs">
                <Calendar className="w-3.5 h-3.5 text-muted-foreground/60" />
                {new Date(repo.updated_at).toLocaleDateString()}
              </span>
            </li>
          </ul>
        </div>
      </div>

      {projectUrl && (
        <div className="pt-8 border-t border-border/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                <span>Live Interactive Preview</span>
              </h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Rendered live in real-time. Direct URL:{" "}
                <a
                  href={projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-semibold"
                >
                  {projectUrl}
                </a>
              </p>
            </div>

            <div className="text-[10px] text-muted-foreground italic sm:text-right max-w-xs leading-relaxed">
              If the preview remains blank, the site&apos;s security policies
              may restrict iframe embedding. Open the link directly instead.
            </div>
          </div>

          <MockBrowserWrapper projectUrl={projectUrl}>
            <ProjectDemoPreview
              src={projectUrl}
              title={`Live Demo for ${repo.name}`}
            />
          </MockBrowserWrapper>
        </div>
      )}
    </div>
  );
}
