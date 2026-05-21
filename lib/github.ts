import { promises as fs } from "fs";
import path from "path";

export interface Repository {
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

export interface GithubProfile {
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

export const FALLBACK_PROFILE: GithubProfile = {
  username: "HoodieYlya13",
  name: "Ylya Martchenko",
  headline: "Software Engineer / Next.js Expert / Full Stack Developer",
  followers: 7,
  following: 6,
  website: "http://HY13dev.com",
  linkedIn: "https://www.linkedin.com/in/ylya-martchenko",
  githubUrl: "https://github.com/HoodieYlya13",
  public_repos: 20,
};

export const FALLBACK_REPOS: Repository[] = [
  {
    name: "codemafia",
    description:
      "A modern, reverse-engineered revival of Code Mafia. Built with Next.js 16, React 19, Tailwind v4, WebSockets (PartyKit), and in-browser Python (Pyodide).",
    html_url: "https://github.com/HoodieYlya13/codemafia",
    language: "JavaScript",
    stargazers_count: 4,
    forks_count: 1,
    fork: false,
    updated_at: "2026-05-11T12:00:00Z",
    homepage: "https://vibecoder.hy13dev.com",
  },
  {
    name: "insta-v2",
    description:
      "🚀 InstaV2: The Next.js 16 & React 19 Best Practices Playground. A high-performance Instagram clone demonstrating the cutting-edge features of Next.js 16 and React 19.",
    html_url: "https://github.com/HoodieYlya13/insta-v2",
    language: "TypeScript",
    fork: false,
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2026-05-07T12:00:00Z",
    homepage: "https://insta-v2-nine.vercel.app",
  },
  {
    name: "schumacher-knepper-theme-dev",
    description:
      "Development fork of the Schumacher-Knepper theme. Used for testing and staging before pushing to my client's production repository. (password = 123)",
    html_url: "https://github.com/HoodieYlya13/schumacher-knepper-theme-dev",
    language: "Liquid",
    fork: true,
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2026-05-17T12:00:00Z",
    homepage: "https://schumacher-knepper-v2.myshopify.com",
  },
  {
    name: "vibe-heist",
    description:
      "Public entry point for Vibe Heist. Orchestrates submodules for the WebGPU engine, web portal, and the private game client. (In Development)",
    html_url: "https://github.com/HoodieYlya13/vibe-heist",
    language: "Shell",
    fork: false,
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2026-05-17T12:00:00Z",
    homepage: "https://vibe-heist.hy13dev.com",
  },
  {
    name: "poly-livre-fullstack",
    description:
      "A modern full-stack book management platform built with Java 21, Spring Boot 3, Next.js 16, and Tailwind CSS. Features a Hexagonal Architecture backend and a responsive, dockerized environment.",
    html_url: "https://github.com/HoodieYlya13/poly-livre-fullstack",
    language: "TypeScript / Java",
    fork: false,
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2026-05-12T12:00:00Z",
  },
  {
    name: "dockercraft",
    description:
      "Dockercraft revival: Manage Minecraft servers with Docker on any system, including native support for ARM (Apple Silicon) and standard x86 architectures.",
    html_url: "https://github.com/HoodieYlya13/dockercraft",
    language: "Lua",
    fork: true,
    stargazers_count: 0,
    forks_count: 1,
    updated_at: "2025-12-12T12:00:00Z",
  },
  {
    name: "vibe-heist-web",
    description:
      "The official web portal and launcher for Vibe Heist. Built with Next.js 16 to serve as the secure container for the high-fidelity WebGPU & WASM open-world simulation. (In Development)",
    html_url: "https://github.com/HoodieYlya13/vibe-heist-web",
    language: "TypeScript",
    fork: false,
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2026-05-17T12:00:00Z",
    homepage: "https://vibe-heist.hy13dev.com",
  },
  {
    name: "eclokit",
    description:
      "AI-Native Open-Source Next.js commerce. Powered by Stripe. Ultra fast with typesafe Commerce SDK. Built for AI development (Claude, Codex, Cursor).",
    html_url: "https://github.com/HoodieYlya13/eclokit",
    language: "MDX",
    fork: true,
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2026-04-27T12:00:00Z",
    homepage: "https://eclokit.vercel.app",
  },
  {
    name: "vibe-engine",
    description:
      "A high-performance, browser-based physics engine written in Rust and compiled to WebAssembly. Powered by Rapier3D for vehicle dynamics and designed for next-gen WebGPU rendering. (In Development)",
    html_url: "https://github.com/HoodieYlya13/vibe-engine",
    language: "Rust",
    fork: false,
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2026-02-12T12:00:00Z",
    homepage: "https://vibe-heist.hy13dev.com",
  },
  {
    name: "css-playground",
    description:
      "A minimalist, interactive CSS playground for experimenting with layouts, animations, and modern styling techniques.",
    html_url: "https://github.com/HoodieYlya13/css-playground",
    language: "CSS",
    fork: false,
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2026-02-12T12:00:00Z",
  },
  {
    name: "poly-livre-frontend",
    description:
      "Frontend repository for the Poly Livre book management platform.",
    html_url: "https://github.com/HoodieYlya13/poly-livre-frontend",
    language: "TypeScript",
    fork: false,
    stargazers_count: 1,
    forks_count: 0,
    updated_at: "2026-01-23T12:00:00Z",
  },
  {
    name: "poly-livre-backend",
    description:
      "Backend repository for the Poly Livre book management platform.",
    html_url: "https://github.com/HoodieYlya13/poly-livre-backend",
    language: "Java",
    fork: false,
    stargazers_count: 1,
    forks_count: 0,
    updated_at: "2026-01-23T12:00:00Z",
  },
  {
    name: "passkey-auth-template",
    description:
      "Template repository demonstrating Passkey authentication implementation.",
    html_url: "https://github.com/HoodieYlya13/passkey-auth-template",
    language: "TypeScript",
    fork: false,
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2026-01-18T12:00:00Z",
    homepage: "https://passkey-auth-template.hy13dev.com",
  },
  {
    name: "config",
    description: "Personal configuration files / dotfiles.",
    html_url: "https://github.com/HoodieYlya13/config",
    language: "Lua",
    fork: false,
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2026-01-17T12:00:00Z",
  },
  {
    name: "poly-livre-fullstack-infrastructure",
    description:
      "Infrastructure configurations and deployment setups for the Poly Livre stack.",
    html_url:
      "https://github.com/HoodieYlya13/poly-livre-fullstack-infrastructure",
    language: "Makefile",
    fork: false,
    stargazers_count: 1,
    forks_count: 0,
    updated_at: "2026-01-15T12:00:00Z",
  },
  {
    name: "honey-pot",
    description:
      "A Next.js Honey Pot application designed to lure attackers, simulate vulnerabilities (like shell access), and log their activities for security analysis.",
    html_url: "https://github.com/HoodieYlya13/honey-pot",
    language: "TypeScript",
    fork: false,
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2025-12-04T12:00:00Z",
  },
  {
    name: "whistleblower",
    description: "Anonymous reporting/whistleblowing platform concept.",
    html_url: "https://github.com/HoodieYlya13/whistleblower",
    language: "JavaScript",
    fork: false,
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2025-01-27T12:00:00Z",
    homepage: "https://whistleblower-dun.vercel.app",
  },
  {
    name: "clock",
    description: "Interactive clock application.",
    html_url: "https://github.com/HoodieYlya13/clock",
    language: "CSS",
    fork: false,
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2024-06-11T12:00:00Z",
  },
  {
    name: "to-do-list",
    description: "Classic to-do list utility application.",
    html_url: "https://github.com/HoodieYlya13/to-do-list",
    language: "JavaScript",
    fork: false,
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2024-06-10T12:00:00Z",
  },
  {
    name: "guess-number",
    description: "Interactive number guessing game.",
    html_url: "https://github.com/HoodieYlya13/guess-number",
    language: "JavaScript",
    fork: false,
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2024-06-07T12:00:00Z",
  },
];

const FALLBACK_PINNED_NAMES = [
  "codemafia",
  "insta-v2",
  "schumacher-knepper-theme-dev",
  "vibe-heist",
  "poly-livre-fullstack",
  "dockercraft",
];

export async function getGithubData() {
  const username = "HoodieYlya13";
  const headers: Record<string, string> = {
    "User-Agent": "portfolio-app-nextjs",
    Accept: "application/vnd.github.v3+json",
    "X-GitHub-Api-Version": "2026-03-10",
  };

  if (process.env.GITHUB_TOKEN)
    headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;

  let targetPinnedNames = FALLBACK_PINNED_NAMES;
  try {
    const profileJson = await getFullProfile();
    if (profileJson && profileJson.pinned_repositories)
      targetPinnedNames = profileJson.pinned_repositories;
  } catch (e) {
    console.warn(
      "Failed retrieving dynamic pins list from profile.json, applying default keys fallback.",
      e,
    );
  }

  const lowercasePins = targetPinnedNames.map((name) => name.toLowerCase());

  try {
    const [profileRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
        {
          headers,
          next: { revalidate: 3600 },
        },
      ),
    ]);

    if (!profileRes.ok || !reposRes.ok)
      throw new Error(
        `GitHub API returned status: ${profileRes.status} / ${reposRes.status}`,
      );

    const profileData = await profileRes.json();
    const reposData = (await reposRes.json()) as Array<{
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

    const allMappedRepos: Repository[] = reposData.map((repo) => ({
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      fork: repo.fork,
      updated_at: repo.updated_at,
      homepage: repo.homepage || null,
    }));

    const pinnedRepositories = allMappedRepos
      .filter((repo) => lowercasePins.includes(repo.name.toLowerCase()))
      .sort(
        (a, b) =>
          lowercasePins.indexOf(a.name.toLowerCase()) -
          lowercasePins.indexOf(b.name.toLowerCase()),
      );

    const remainingRepositories = allMappedRepos.filter(
      (repo) => !lowercasePins.includes(repo.name.toLowerCase()),
    );

    return {
      profile: {
        username: profileData.login,
        name: profileData.name || FALLBACK_PROFILE.name,
        headline: profileData.bio || FALLBACK_PROFILE.headline,
        followers: profileData.followers,
        following: profileData.following,
        website: profileData.blog || FALLBACK_PROFILE.website,
        linkedIn: FALLBACK_PROFILE.linkedIn,
        githubUrl: profileData.html_url,
        public_repos: profileData.public_repos,
      } as GithubProfile,
      pinnedRepositories,
      repositories: remainingRepositories,
      isLive: true,
    };
  } catch (error) {
    console.error(
      "Failed fetching live GitHub data, falling back to static:",
      error,
    );

    const fallbackPinned = FALLBACK_REPOS.filter((repo) =>
      lowercasePins.includes(repo.name.toLowerCase()),
    ).sort(
      (a, b) =>
        lowercasePins.indexOf(a.name.toLowerCase()) -
        lowercasePins.indexOf(b.name.toLowerCase()),
    );

    const fallbackRemaining = FALLBACK_REPOS.filter(
      (repo) => !lowercasePins.includes(repo.name.toLowerCase()),
    );

    return {
      profile: FALLBACK_PROFILE,
      pinnedRepositories: fallbackPinned,
      repositories: fallbackRemaining,
      isLive: false,
    };
  }
}

export async function getGithubRepo(name: string) {
  const username = "HoodieYlya13";
  const headers: Record<string, string> = {
    "User-Agent": "portfolio-app-nextjs",
    Accept: "application/vnd.github.v3+json",
    "X-GitHub-Api-Version": "2026-03-10",
  };

  if (process.env.GITHUB_TOKEN)
    headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;

  try {
    const res = await fetch(
      `https://api.github.com/repos/${username}/${name}`,
      {
        headers,
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) throw new Error(`GitHub API returned status: ${res.status}`);

    const repo = await res.json();
    return {
      repo: {
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        fork: repo.fork,
        updated_at: repo.updated_at,
        homepage: repo.homepage || null,
      } as Repository,
      isLive: true,
    };
  } catch (error) {
    console.error(`Failed fetching live repo ${name}, using static:`, error);
    const fallback = FALLBACK_REPOS.find(
      (r) => r.name.toLowerCase() === name.toLowerCase(),
    );
    return {
      repo: fallback || null,
      isLive: false,
    };
  }
}

export interface FullProfileData {
  identity: {
    name: string;
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
}

export async function getFullProfile(): Promise<FullProfileData | null> {
  const remoteUrl =
    "https://raw.githubusercontent.com/HoodieYlya13/HoodieYlya13/main/profile.json";

  try {
    const res = await fetch(remoteUrl, {
      next: { revalidate: 3600 },
    });

    if (!res.ok)
      throw new Error(`GitHub raw responded with status: ${res.status}`);

    return await res.json();
  } catch (remoteError) {
    console.error(
      "Failed fetching profile from GitHub, trying local fallback:",
      remoteError,
    );

    try {
      const filePath = path.join(
        process.cwd(),
        "public",
        "info",
        "profile.json",
      );
      const fileContents = await fs.readFile(filePath, "utf8");
      return JSON.parse(fileContents);
    } catch (localError) {
      console.error(
        "Critical: Local profile fallback also failed:",
        localError,
      );
      return null;
    }
  }
}
