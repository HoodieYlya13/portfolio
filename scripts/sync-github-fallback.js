/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

let token = process.env.GITHUB_TOKEN;
const envLocalPath = path.join(__dirname, "../.env.local");
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, "utf-8");
  const match = envContent.match(/^GITHUB_TOKEN=(.+)$/m);
  if (match && match[1]) token = match[1].trim();
}

const {
  mapGithubRepoToRepository,
  partitionAndSortRepos,
  fetchGithubProfileAndRepos,
  mapGithubProfile,
} = require("../lib/github-shared");

const username = "HoodieYlya13";

async function tryCatch(promiseOrFn) {
  try {
    const data = await (typeof promiseOrFn === "function"
      ? promiseOrFn()
      : promiseOrFn);
    return [null, data];
  } catch (error) {
    return [error, null];
  }
}

function tryCatchSync(fn) {
  try {
    return [null, fn()];
  } catch (error) {
    return [error, null];
  }
}

async function syncGithubFallback() {
  const localProfilePath = path.join(__dirname, "../public/info/profile.json");
  const fallbackPath = path.join(
    __dirname,
    "../public/info/github-fallback.json",
  );

  console.log("[sync-github] Syncing GitHub data to fallback file...");

  let pinnedNames = ["teslimitless", "ylya-bot", "codemafia"];
  let honorableNames = [];

  if (fs.existsSync(localProfilePath)) {
    const [readErr] = tryCatchSync(() => {
      const profile = JSON.parse(fs.readFileSync(localProfilePath, "utf-8"));
      if (profile.repositories) {
        if (profile.repositories.pinned_repositories)
          pinnedNames = profile.repositories.pinned_repositories;
        if (profile.repositories.honorable_mentions_repositories)
          honorableNames = profile.repositories.honorable_mentions_repositories;
      } else if (profile.pinned_repositories)
        pinnedNames = profile.pinned_repositories;
    });
    if (readErr)
      console.warn(
        "⚠️ [sync-github] Failed parsing profile.json, using fallback names:",
        readErr.message,
      );
  }

  const lowercasePins = pinnedNames.map((name) => name.toLowerCase());
  const lowercaseHonorable = honorableNames.map((name) => name.toLowerCase());

  const headers = {
    "User-Agent": "portfolio-app-nextjs",
    Accept: "application/vnd.github.v3+json",
    "X-GitHub-Api-Version": "2026-03-10",
  };

  if (token) {
    headers["Authorization"] = `token ${token}`;
    console.log("[sync-github] Using authenticated GITHUB_TOKEN from env.");
  } else
    console.warn(
      "⚠️ [sync-github] No GITHUB_TOKEN found. Requests might be rate-limited.",
    );

  const [syncErr] = await tryCatch(async () => {
    const { profileData, reposData } = await fetchGithubProfileAndRepos(
      username,
      headers,
    );

    const profile = mapGithubProfile(profileData);

    const fetchPortfolio = async (repoName) => {
      const apiHeaders = { ...headers };
      apiHeaders["Accept"] = "application/vnd.github.v3.raw";

      const [fetchErr, portfolioData] = await tryCatch(async () => {
        const res = await fetch(
          `https://api.github.com/repos/${username}/${repoName}/contents/portfolio.json`,
          { headers: apiHeaders },
        );
        if (res.ok) return await res.json();
        return null;
      });

      if (fetchErr) return null;
      return portfolioData;
    };

    const resolvedRepos = await Promise.all(
      reposData.map(async (repo) => {
        const portfolio = await fetchPortfolio(repo.name);
        if (!portfolio) return null;
        return mapGithubRepoToRepository(repo, portfolio);
      }),
    );

    const allMappedRepos = resolvedRepos.filter((r) => r !== null);

    const { pinnedRepositories, honorableRepositories, remainingRepositories } =
      partitionAndSortRepos(allMappedRepos, lowercasePins, lowercaseHonorable);

    const result = {
      profile,
      pinnedRepositories,
      honorableRepositories,
      repositories: remainingRepositories,
    };

    const dir = path.dirname(fallbackPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(fallbackPath, JSON.stringify(result, null, 2), "utf-8");
    console.log("✅ [sync-github] Successfully synced github-fallback.json!");
  });

  if (syncErr) {
    console.warn(
      "⚠️ [sync-github] Failed fetching GitHub data. Leaving existing github-fallback.json intact:",
      syncErr.message,
    );
  }
}

syncGithubFallback();
