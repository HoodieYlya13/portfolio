// TODO: style this

import { Suspense } from "react";
import Link from "next/link";
import { getGithubData } from "@/lib/github";

async function ProjectsContent() {
  const { profile, repositories, isLive } = await getGithubData();

  return (
    <>
      <div className="mb-4">
        <p className="text-sm">
          Status:{" "}
          {isLive ? (
            <span className="text-green-500 font-medium">● Live GitHub API Data (Cached 1hr)</span>
          ) : (
            <span className="text-amber-500 font-medium">● Fallback Offline Data (API rate-limit / unavailable)</span>
          )}
        </p>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{profile.name}&apos;s Projects</h1>
        <p className="mb-1"><strong>GitHub:</strong> <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{profile.githubUrl}</a></p>
        <p className="text-sm text-gray-500">
          <strong>Total Public Repositories:</strong> {profile.public_repos} | <strong>Followers:</strong> {profile.followers}
        </p>
      </div>

      <hr className="border-gray-200 my-6" />

      <div>
        <h2 className="text-2xl font-semibold mb-4">Repositories ({repositories.length})</h2>
        <ul className="list-none pl-0 space-y-6">
          {repositories.map((repo) => (
            <li key={repo.name} className="border-b border-gray-100 pb-6">
              <h3 className="mb-2">
                <Link href={`/projects/${repo.name}`} scroll={false} className="text-xl font-bold text-blue-600 hover:underline">
                  {repo.name}
                </Link>{" "}
                {repo.fork && <span className="text-xs text-gray-400 font-normal italic">[Forked]</span>}
              </h3>
              {repo.description ? <p className="text-gray-700 mb-2">{repo.description}</p> : <p className="text-gray-400 italic mb-2">No description provided.</p>}
              <p className="text-sm text-gray-500 mb-2">
                <strong>Language:</strong> {repo.language || "Not specified"} |{" "}
                ⭐ Stars: {repo.stargazers_count} |{" "}
                🍴 Forks: {repo.forks_count} |{" "}
                Last Updated: {new Date(repo.updated_at).toLocaleDateString()}
              </p>
              <p>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">
                  View original on GitHub ↗
                </a>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default function ProjectsPage() {
  return (
    <div className="p-8 pb-40 max-w-4xl mx-auto">
      <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading...</div>}>
        <ProjectsContent />
      </Suspense>
    </div>
  );
}
