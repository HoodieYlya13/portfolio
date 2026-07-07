import { cacheLife } from "next/cache";
import localProfile from "../public/info/profile.json";
import fallbackData from "../public/info/github-fallback.json";
import { tryCatch, tryCatchSync } from "@/lib/utils";
import {
  mapGithubRepoToRepository,
  partitionAndSortRepos,
  fetchGithubProfileAndRepos,
  mapGithubProfile,
} from "./github-shared";


export interface MediaAsset {
  url: string;
  alt: string;
  caption: string;
}

export interface ProjectRouting {
  repo_name: string;
  project_name: string;
  hero_image?: string | "";
}

export interface ProjectMeta {
  role: string;
  development_phase: string;
  languages: string[];
  frameworks_and_tools: string[];
}

export interface MeasurableMetrics {
  execution_latency: string;
  ui_performance: string;
  operational_cost: string;
}

export interface StarChallenge {
  situation: string;
  action: string;
  result: string;
  inline_image?: string | "";
}

export interface ArchitecturalDeepDive {
  text: string;
  illustration?: MediaAsset | null;
}

export interface PortfolioProject {
  routing: ProjectRouting;
  project_meta: ProjectMeta;
  comprehensive_description: string;
  engineering_highlights: string[];
  measurable_metrics: MeasurableMetrics;
  star_challenges: StarChallenge[];
  architectural_deep_dive: ArchitecturalDeepDive;
  lessons_learned: string;
}

export interface Repository {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  languages: string[];
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  updated_at: string;
  homepage?: string | null;
  portfolio: PortfolioProject;
}

interface GithubProfile {
  username: string;
  name: string;
  headline: string;
  followers: number;
  following: number;
  website: string;
  linkedIn: string;
  githubUrl: string;
  public_repos: number;
}

const FALLBACK_PROFILE = fallbackData.profile as GithubProfile;
const FALLBACK_REPOS = [
  ...fallbackData.pinnedRepositories,
  ...fallbackData.honorableRepositories,
  ...fallbackData.repositories,
] as unknown as Repository[];

const FALLBACK_PINNED_NAMES = ["teslimitless", "ylya-bot", "codemafia"];

function sanitizeContent<T>(obj: T): T {
  if (typeof obj === "string") {
    let sanitized = obj.replace(/\\n/g, "\n");
    const hy13Regex = /https?:\/\/(?:www\.)?hy13dev\.com\/?/gi;
    if (hy13Regex.test(sanitized))
      sanitized = sanitized.replace(hy13Regex, () => "/");
    return sanitized as unknown as T;
  }
  if (Array.isArray(obj))
    return obj.map((item) => sanitizeContent(item)) as unknown as T;
  if (obj !== null && typeof obj === "object") {
    const result: Record<string, unknown> = {};
    const objAsRecord = obj as Record<string, unknown>;
    for (const key in objAsRecord)
      if (Object.prototype.hasOwnProperty.call(objAsRecord, key))
        result[key] = sanitizeContent(objAsRecord[key]);
    return result as T;
  }
  return obj;
}

async function extractPortfolio(
  res: Response,
): Promise<PortfolioProject | null> {
  const [jsonErr, json] = await tryCatch(res.json());
  if (!jsonErr && json && json.routing && json.project_meta)
    return sanitizeContent(json) as PortfolioProject;
  return null;
}

async function fetchPortfolio(
  username: string,
  repoName: string,
  headers: Record<string, string>,
): Promise<PortfolioProject | null> {
  const [err, res] = await tryCatch(
    fetch(
      `https://api.github.com/repos/${username}/${repoName}/contents/portfolio.json`,
      {
        headers: {
          ...headers,
          Accept: "application/vnd.github.v3.raw",
        },
        signal: AbortSignal.timeout(3000),
      },
    ),
  );

  if (!err && res.ok) {
    const portfolio = await extractPortfolio(res);
    if (portfolio) return portfolio;
  }

  return null;
}

export interface GithubRepositoryResponse {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  updated_at: string;
  homepage?: string | null;
}


export async function getGithubData() {
  "use cache";
  cacheLife("hours");

  const username = "HoodieYlya13";
  const headers: Record<string, string> = {
    "User-Agent": "portfolio-app-nextjs",
    Accept: "application/vnd.github.v3+json",
    "X-GitHub-Api-Version": "2026-03-10",
  };

  if (process.env.GITHUB_TOKEN)
    headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;

  let targetPinnedNames = FALLBACK_PINNED_NAMES;
  let targetHonorableNames: string[] = [];
  const [profileErr, profileJson] = await tryCatch(getFullProfile());
  if (!profileErr && profileJson) {
    if (profileJson.repositories) {
      if (profileJson.repositories.pinned_repositories)
        targetPinnedNames = profileJson.repositories.pinned_repositories;
      if (profileJson.repositories.honorable_mentions_repositories)
        targetHonorableNames =
          profileJson.repositories.honorable_mentions_repositories;
    } else if (profileJson.pinned_repositories)
      targetPinnedNames = profileJson.pinned_repositories;
  } else
    console.warn(
      "Failed retrieving dynamic repositories lists from profile.json, applying default keys fallback.",
      profileErr,
    );

  const lowercasePins = targetPinnedNames.map((name) => name.toLowerCase());
  const lowercaseHonorable = targetHonorableNames.map((name) =>
    name.toLowerCase(),
  );

  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("GitHub API global fetch timeout")), 7500)
  );

  const [error, liveData] = await tryCatch(
    Promise.race([
      (async () => {
        const { profileData, reposData } = (await fetchGithubProfileAndRepos(
          username,
          headers,
          AbortSignal.timeout(3000),
        )) as {
          profileData: unknown;
          reposData: Array<{
            name: string;
            description: string | null;
            html_url: string;
            language: string | null;
            stargazers_count: number;
            forks_count: number;
            updated_at: string;
            fork: boolean;
            homepage?: string | null;
          }>;
        };

        const repoPromises = reposData.map(async (repo) => {
          const [portfolioErr, portfolio] = await tryCatch(
            fetchPortfolio(username, repo.name, headers),
          );
          if (portfolioErr || !portfolio) return null;

          return mapGithubRepoToRepository(repo, portfolio);
        });

        const resolvedRepos = await Promise.all(repoPromises);
        const allMappedRepos = resolvedRepos.filter(
          (r): r is Repository => r !== null,
        );

        const {
          pinnedRepositories,
          honorableRepositories,
          remainingRepositories,
        } = partitionAndSortRepos(allMappedRepos, lowercasePins, lowercaseHonorable);

        return {
          profile: mapGithubProfile(profileData),
          pinnedRepositories,
          honorableRepositories,
          repositories: remainingRepositories,
          isLive: true,
        };
      })(),
      timeoutPromise,
    ])
  );

  if (!error && liveData) return sanitizeContent(liveData);

  console.error(
    "Failed fetching live GitHub data, falling back to static:",
    error,
  );

  const {
    pinnedRepositories: fallbackPinned,
    honorableRepositories: fallbackHonorable,
    remainingRepositories: fallbackRemaining,
  } = partitionAndSortRepos(FALLBACK_REPOS, lowercasePins, lowercaseHonorable);

  return sanitizeContent({
    profile: FALLBACK_PROFILE,
    pinnedRepositories: fallbackPinned,
    honorableRepositories: fallbackHonorable,
    repositories: fallbackRemaining,
    isLive: false,
  });
}

export async function getGithubRepo(name: string) {
  "use cache";
  cacheLife("hours");

  const username = "HoodieYlya13";
  const headers: Record<string, string> = {
    "User-Agent": "portfolio-app-nextjs",
    Accept: "application/vnd.github.v3+json",
    "X-GitHub-Api-Version": "2026-03-10",
  };

  if (process.env.GITHUB_TOKEN)
    headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;

  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("GitHub API repo fetch timeout")), 7500)
  );

  const [error, liveData] = await tryCatch(
    Promise.race([
      (async () => {
        const [repoRes, portfolio] = await Promise.all([
          fetch(`https://api.github.com/repos/${username}/${name}`, {
            headers,
            signal: AbortSignal.timeout(3000),
          }),
          fetchPortfolio(username, name, headers),
        ]);

        if (!repoRes.ok || !portfolio)
          throw new Error(
            `Failed to retrieve data. Repo metadata status: ${repoRes.status}. Portfolio parsed: ${!!portfolio}`,
          );

        const repo = await repoRes.json();
        return {
          repo: mapGithubRepoToRepository(repo, portfolio),
          isLive: true,
        };
      })(),
      timeoutPromise,
    ])
  );

  if (!error && liveData) return sanitizeContent(liveData);

  console.error(`Failed fetching live repo ${name}, using static:`, error);
  const fallback = FALLBACK_REPOS.find(
    (r) => r.name.toLowerCase() === name.toLowerCase(),
  );
  return sanitizeContent({
    repo: fallback || null,
    isLive: false,
  });
}

export interface FullProfileData {
  identity: {
    full_name: string;
    birthday: string;
    nationality: string;
    current_location: string;
    current_status: string;
    coding_experience_since: number;
  };
  hero_marquee: string[];
  communication: {
    languages: Array<{
      name: string;
      cefr: string;
      label: string;
    }>;
    channels: Array<{
      platform: string;
      value: string;
      icon: string;
    }>;
    links: {
      live_portfolio: string;
      downloadable_resume: string;
    };
  };
  placement_preferences: {
    target_regions: string[];
    preference: string;
    technical_domains: string[];
  };
  skills_matrix: {
    primary_web_stack: string[];
    backend_and_data: string[];
    polyglot_languages: string[];
    devops_and_systems: string[];
    ai_engineering: string[];
    ecosystem_tools: string[];
    leadership_traits: string[];
  };
  timeline_engineering: Array<{
    range: string;
    role: string;
    company: string;
    location: string;
    bullets: string[];
    main?: boolean;
    meta?: {
      project_url: string;
      note: string;
    };
  }>;
  timeline_foundational: Array<{
    range: string;
    role: string;
    company: string;
    location: string;
    bullets: string[];
  }>;
  academic_history: Array<{
    range: string;
    degree: string;
    institution: string;
    location: string;
    summary: string;
    main?: boolean;
  }>;
  pinned_repositories?: string[];
  repositories?: {
    pinned_repositories?: string[];
    honorable_mentions_repositories?: string[];
  };
}

export async function getFullProfile(): Promise<FullProfileData | null> {
  "use cache";
  cacheLife("hours");

  if (process.env.NEXT_PHASE === "phase-production-build") {
    const [err, content] = tryCatchSync(() => sanitizeContent(localProfile));
    return err ? null : content;
  }

  const remoteUrl =
    "https://raw.githubusercontent.com/HoodieYlya13/HoodieYlya13/main/profile.json";

  const [error, data] = await tryCatch(async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(remoteUrl, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error(`Status ${res.status}`);
    const json = await res.json();
    return sanitizeContent(json);
  });

  if (!error) return data;

  console.warn(
    "⚠️ [getFullProfile] Fetch failed, falling back to local file:",
    error instanceof Error ? error.message : String(error),
  );

  const [fallbackErr, content] = tryCatchSync(() =>
    sanitizeContent(localProfile),
  );
  return fallbackErr ? null : content;
}
