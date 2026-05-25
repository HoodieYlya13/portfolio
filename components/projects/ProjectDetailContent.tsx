import {
  ArrowRight,
  ExternalLink,
  Calendar,
  Code2,
  Star,
  GitFork,
  Globe,
  Zap,
  Gauge,
  Coins,
  Cpu,
  AlertTriangle,
  Wrench,
  CheckCircle,
  Lightbulb,
  Layers,
} from "lucide-react";
import Image from "next/image";
import { GithubIcon } from "@/components/icons/Brands";
import { ShopifyStorefrontEnterButton } from "@/components/projects/ShopifyStorefrontEnterButton";
import { getShopifyStorefrontHost } from "@/lib/shopify-storefront-previews";
import MockBrowserWrapper from "@/components/projects/MockBrowserWrapper";
import { ProjectDemoPreview } from "@/components/projects/ProjectDemoPreview";
import { Repository } from "@/lib/github";
import { Markdown } from "@/components/ui/Markdown";

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

  const portfolio = repo.portfolio;

  return (
    <div className="space-y-12 text-foreground text-left max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/60 relative z-10">
        <div className="space-y-1.5">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            {repo.portfolio.routing.project_name || repo.name}
          </h1>

          <div className="flex flex-wrap gap-2 items-center">
            {portfolio?.project_meta?.role && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                {portfolio.project_meta.role}
              </span>
            )}
            {portfolio?.project_meta?.development_phase && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-muted text-foreground/80 border border-border/40">
                {portfolio.project_meta.development_phase}
              </span>
            )}
            {repo.fork && (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded border border-border/40 font-medium">
                <GitFork className="w-3 h-3" />
                <span>Forked</span>
              </span>
            )}
          </div>
        </div>

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
                isLive ? "bg-apple-green animate-pulse" : "bg-primary"
              }`}
            />
            {isLive ? "Live Sync" : "Cached Static"}
          </span>
        </div>
      </div>

      {portfolio?.routing?.hero_image && (
        <div className="relative w-full z-10">
          <Image
            src={portfolio.routing.hero_image}
            alt={portfolio.routing.project_name}
            width={1200}
            height={630}
            priority
            unoptimized
            className="w-full h-auto object-contain"
          />
        </div>
      )}

      {repo.description && (
        <div className="relative z-10 max-w-4xl">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
            {repo.description}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start relative z-10">
        <div className="lg:col-span-2 space-y-10">
          <section className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              <span>Project Overview</span>
            </h2>
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <Markdown
                content={
                  portfolio?.comprehensive_description ||
                  repo.description ||
                  "No description provided for this repository."
                }
                className="text-base md:text-lg text-foreground/80 font-medium"
              />
            </div>
          </section>

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

        <div className="bg-card/25 dark:bg-card/15 backdrop-blur-md p-6 rounded-2xl border border-foreground/10 dark:border-foreground/5 shadow-xs space-y-5">
          <h3 className="text-md font-bold text-foreground border-b border-foreground/10 pb-2.5 flex items-center gap-2">
            <Code2 className="w-4 h-4 text-primary" />
            <span>Specifications</span>
          </h3>

          <ul className="space-y-4 text-sm text-muted-foreground">
            {portfolio?.project_meta?.role && (
              <li className="flex flex-col gap-1.5">
                <span className="font-semibold text-foreground/70">
                  My Role
                </span>
                <span className="text-foreground text-xs font-semibold bg-muted/65 border border-border/40 px-2 py-1 rounded w-fit">
                  {portfolio.project_meta.role}
                </span>
              </li>
            )}

            {portfolio?.project_meta?.development_phase && (
              <li className="flex flex-col gap-1.5">
                <span className="font-semibold text-foreground/70">
                  Development Phase
                </span>
                <span className="text-foreground text-xs font-semibold bg-muted/65 border border-border/40 px-2 py-1 rounded w-fit">
                  {portfolio.project_meta.development_phase}
                </span>
              </li>
            )}

            <li className="flex flex-col gap-1.5">
              <span className="font-semibold text-foreground/70">
                Languages
              </span>
              <div className="flex flex-wrap gap-1">
                {repo.languages && repo.languages.length > 0 ? (
                  repo.languages.map((lang) => (
                    <span
                      key={lang}
                      className="inline-flex items-center px-2 py-0.5 rounded bg-muted text-foreground/80 border border-border/40 font-medium text-xs"
                    >
                      {lang}
                    </span>
                  ))
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded bg-muted text-foreground/80 border border-border/40 font-medium text-xs">
                    {repo.language || "Not specified"}
                  </span>
                )}
              </div>
            </li>

            {portfolio?.project_meta?.frameworks_and_tools &&
              portfolio.project_meta.frameworks_and_tools.length > 0 && (
                <li className="flex flex-col gap-1.5">
                  <span className="font-semibold text-foreground/70">
                    Tools & Frameworks
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {portfolio.project_meta.frameworks_and_tools.map((tool) => (
                      <span
                        key={tool}
                        className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary/5 text-primary/95 border border-primary/10 font-semibold text-[10px]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </li>
              )}

            <li className="flex justify-between items-center border-t border-foreground/5 pt-3">
              <span className="font-semibold text-foreground/70 flex items-center gap-1.5">
                <Star className="w-4 h-4 text-apple-yellow" />
                <span>Stars</span>
              </span>
              <span className="text-foreground font-bold">
                {repo.stargazers_count}
              </span>
            </li>

            <li className="flex justify-between items-center">
              <span className="font-semibold text-foreground/70 flex items-center gap-1.5">
                <GitFork className="w-4 h-4 text-primary" />
                <span>Forks</span>
              </span>
              <span className="text-foreground font-bold">
                {repo.forks_count}
              </span>
            </li>

            <li className="flex justify-between items-center border-t border-foreground/5 pt-3">
              <span className="font-semibold text-foreground/70 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-muted-foreground/60" />
                <span>Last Updated</span>
              </span>
              <span className="text-foreground font-semibold text-xs">
                {new Date(repo.updated_at).toLocaleDateString()}
              </span>
            </li>
          </ul>
        </div>
      </div>

      {portfolio?.measurable_metrics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="group relative flex flex-col p-6 rounded-2xl bg-card/45 dark:bg-card/25 border border-border/60 dark:border-border/40 shadow-xs hover:border-apple-green/40 dark:hover:border-apple-green/30 hover:shadow-lg hover:shadow-apple-green/5 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-apple-green/10 text-apple-green">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-foreground text-sm uppercase tracking-wider">
                Execution Latency
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {portfolio.measurable_metrics.execution_latency}
            </p>
          </div>

          <div className="group relative flex flex-col p-6 rounded-2xl bg-card/45 dark:bg-card/25 border border-border/60 dark:border-border/40 shadow-xs hover:border-primary/40 dark:hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <Gauge className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-foreground text-sm uppercase tracking-wider">
                UI Performance
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {portfolio.measurable_metrics.ui_performance}
            </p>
          </div>

          <div className="group relative flex flex-col p-6 rounded-2xl bg-card/45 dark:bg-card/25 border border-border/60 dark:border-border/40 shadow-xs hover:border-apple-yellow/40 dark:hover:border-apple-yellow/30 hover:shadow-lg hover:shadow-apple-yellow/5 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-apple-yellow/10 text-apple-yellow">
                <Coins className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-foreground text-sm uppercase tracking-wider">
                Operational Cost
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {portfolio.measurable_metrics.operational_cost}
            </p>
          </div>
        </div>
      )}

      {portfolio?.engineering_highlights &&
        portfolio.engineering_highlights.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Cpu className="w-5 h-5 text-primary" />
              <span>Engineering Highlights & Achievements</span>
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {portfolio.engineering_highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-5 rounded-2xl bg-card/25 dark:bg-card/15 border border-border/50 dark:border-border/30 hover:border-primary/30 transition-colors duration-300"
                >
                  <div className="shrink-0 mt-0.5">
                    <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                      {index + 1}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

      {portfolio?.star_challenges && portfolio.star_challenges.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-border/60 relative z-10">
          <div className="space-y-1">
            <h2 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              <span>Engineering Challenges (STAR Method)</span>
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Exhaustive situation-action-result breakdowns showcasing
              problem-solving and architectural execution.
            </p>
          </div>

          <div className="space-y-8">
            {portfolio.star_challenges.map((challenge, index) => (
              <div
                key={index}
                className="p-6 rounded-3xl bg-card/30 dark:bg-card/15 border border-border/60 dark:border-border/40 shadow-xs space-y-5"
              >
                <div className="flex items-center justify-between border-b border-foreground/5 pb-3">
                  <h3 className="font-extrabold text-foreground text-md flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-semibold tracking-wider whitespace-nowrap">
                      CHALLENGE {index + 1}
                    </span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="flex gap-3.5 p-5 rounded-2xl bg-apple-orange/5 dark:bg-apple-orange/5 border-l-4 border-apple-orange/60 dark:border-apple-orange/40">
                    <div className="shrink-0">
                      <AlertTriangle className="w-5 h-5 text-apple-orange" />
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <span className="font-bold text-apple-orange text-xs uppercase tracking-wider block">
                        Situation & Impediment
                      </span>
                      <Markdown
                        content={challenge.situation}
                        className="text-xs text-muted-foreground"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3.5 p-5 rounded-2xl bg-apple-blue/5 dark:bg-apple-blue/5 border-l-4 border-apple-blue/60 dark:border-apple-blue/40">
                    <div className="shrink-0">
                      <Wrench className="w-5 h-5 text-apple-blue" />
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <span className="font-bold text-apple-blue text-xs uppercase tracking-wider block">
                        Engineering Action
                      </span>
                      <Markdown
                        content={challenge.action}
                        className="text-xs text-muted-foreground"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3.5 p-5 rounded-2xl bg-apple-green/5 dark:bg-apple-green/5 border-l-4 border-apple-green/60 dark:border-apple-green/40">
                    <div className="shrink-0">
                      <CheckCircle className="w-5 h-5 text-apple-green" />
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <span className="font-bold text-apple-green text-xs uppercase tracking-wider block">
                        Quantifiable Result
                      </span>
                      <Markdown
                        content={challenge.result}
                        className="text-xs text-muted-foreground"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {portfolio?.architectural_deep_dive && (
        <section className="space-y-6 pt-6 border-t border-border/60 relative z-10">
          <div className="space-y-1">
            <h2 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              <span>Architectural Deep Dive</span>
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Low-level component relationships, system boundaries, and runtime
              flows.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 items-stretch">
            <div className="flex flex-col justify-center p-6 rounded-2xl bg-card/25 dark:bg-card/15 border border-border/50 dark:border-border/30">
              <Markdown
                content={portfolio.architectural_deep_dive.text}
                className="text-sm md:text-base text-muted-foreground font-medium"
              />
            </div>

            {portfolio.architectural_deep_dive.illustration && (
              <div className="flex flex-col space-y-3">
                <div className="relative w-full">
                  <Image
                    src={portfolio.architectural_deep_dive.illustration.url}
                    alt={portfolio.architectural_deep_dive.illustration.alt}
                    width={800}
                    height={450}
                    unoptimized
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="space-y-1 text-left px-1">
                  <h4 className="text-xs font-bold text-foreground line-clamp-1">
                    {portfolio.architectural_deep_dive.illustration.alt}
                  </h4>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    {portfolio.architectural_deep_dive.illustration.caption}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {portfolio?.lessons_learned && (
        <section className="space-y-4 pt-6 border-t border-border/60 relative z-10">
          <div className="p-6 rounded-3xl bg-primary/5 dark:bg-primary/5 border border-primary/20 dark:border-primary/10 shadow-xs flex flex-col md:flex-row gap-5 items-start">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary shrink-0">
              <Lightbulb className="w-6 h-6 animate-pulse" />
            </div>
            <div className="space-y-1.5 text-left">
              <h3 className="font-extrabold text-foreground text-md">
                Lessons Learned & Core Takeaways
              </h3>
              <Markdown
                content={portfolio.lessons_learned}
                className="text-sm text-muted-foreground"
              />
            </div>
          </div>
        </section>
      )}

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
