import {
  Repository,
  GithubProfile,
  GithubRepositoryResponse,
  PortfolioProject,
} from "./github";

export {
  Repository,
  GithubProfile,
  GithubRepositoryResponse,
  PortfolioProject,
};

export function mapGithubRepoToRepository(
  repo: GithubRepositoryResponse,
  portfolio: PortfolioProject,
): Repository;

export function partitionAndSortRepos(
  allMappedRepos: Repository[],
  lowercasePins: string[],
  lowercaseHonorable: string[],
): {
  pinnedRepositories: Repository[];
  honorableRepositories: Repository[];
  remainingRepositories: Repository[];
};

export function fetchGithubProfileAndRepos(
  username: string,
  headers: Record<string, string>,
  signal?: AbortSignal,
): Promise<{ profileData: unknown; reposData: unknown }>;

export function mapGithubProfile(profileData: unknown): GithubProfile;

