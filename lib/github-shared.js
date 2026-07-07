const FALLBACK_PROFILE = {
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

function mapGithubRepoToRepository(repo, portfolio) {
  return {
    name: repo.name,
    description: repo.description,
    html_url: repo.html_url,
    language: portfolio.project_meta?.languages?.[0] || repo.language,
    languages: portfolio.project_meta?.languages || [],
    stargazers_count: repo.stargazers_count,
    forks_count: repo.forks_count,
    fork: repo.fork,
    updated_at: repo.updated_at,
    homepage: repo.homepage || null,
    portfolio,
  };
}

function filterAndSortRepos(repos, lowercaseNames) {
  return repos
    .filter((repo) => lowercaseNames.includes(repo.name.toLowerCase()))
    .sort(
      (a, b) =>
        lowercaseNames.indexOf(a.name.toLowerCase()) -
        lowercaseNames.indexOf(b.name.toLowerCase()),
    );
}

function partitionAndSortRepos(
  allMappedRepos,
  lowercasePins,
  lowercaseHonorable,
) {
  const pinnedRepositories = filterAndSortRepos(allMappedRepos, lowercasePins);
  const honorableRepositories = filterAndSortRepos(
    allMappedRepos,
    lowercaseHonorable,
  );
  const remainingRepositories = allMappedRepos.filter(
    (repo) =>
      !lowercasePins.includes(repo.name.toLowerCase()) &&
      !lowercaseHonorable.includes(repo.name.toLowerCase()),
  );
  return { pinnedRepositories, honorableRepositories, remainingRepositories };
}

function fetchGithubProfileAndRepos(username, headers, signal) {
  return Promise.all([
    fetch(`https://api.github.com/users/${username}`, { headers, signal }),
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      { headers, signal },
    ),
  ]).then(async ([profileRes, reposRes]) => {
    if (!profileRes.ok || !reposRes.ok) {
      throw new Error(
        `GitHub API returned status: ${profileRes.status} / ${reposRes.status}`,
      );
    }
    const profileData = await profileRes.json();
    const reposData = await reposRes.json();
    return { profileData, reposData };
  });
}

function mapGithubProfile(profileData) {
  return {
    username: profileData.login,
    name: profileData.name || FALLBACK_PROFILE.name,
    headline: profileData.bio || FALLBACK_PROFILE.headline,
    followers: profileData.followers,
    following: profileData.following,
    website: profileData.blog || FALLBACK_PROFILE.website,
    linkedIn: FALLBACK_PROFILE.linkedIn,
    githubUrl: profileData.html_url,
    public_repos: profileData.public_repos,
  };
}

module.exports = {
  mapGithubRepoToRepository,
  partitionAndSortRepos,
  fetchGithubProfileAndRepos,
  mapGithubProfile,
};
