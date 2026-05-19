// TODO: style this

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getGithubRepo } from "@/lib/github";
import CloseButton from "@/components/projects/CloseButton";
import ModalOverlay from "@/components/projects/ModalOverlay";
import { ProjectDemoPreview } from "@/components/projects/ProjectDemoPreview";
import { ShopifyStorefrontEnterButton } from "@/components/projects/ShopifyStorefrontEnterButton";
import { getShopifyStorefrontHost } from "@/lib/shopify-storefront-previews";

interface ProjectModalProps {
  params: Promise<{ id: string }>;
}

async function ProjectModalDetail({ id }: { id: string }) {
  const { repo, isLive } = await getGithubRepo(id);

  if (!repo) notFound();

  let projectUrl = repo.homepage || null;

  if (!projectUrl && repo.description) {
    const urlRegex = /(https?:\/\/[^\s"'`,;)]+)/g;
    const match = repo.description.match(urlRegex);
    if (match) projectUrl = match[0];
  }

  const shopifyHost = projectUrl ? getShopifyStorefrontHost(projectUrl) : undefined;

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-gray-500">
          Status:{" "}
          {isLive ? (
            <span className="text-green-500 font-medium">● Live API (Cached)</span>
          ) : (
            <span className="text-amber-500 font-medium">● Fallback</span>
          )}
        </span>
      </div>

      <hr className="my-4 border-gray-100 dark:border-gray-900" />

      <h1 className="text-2xl font-bold mb-2">[Modal View] {repo.name}</h1>

      {repo.fork && (
        <p className="italic text-gray-500 text-sm mb-4">
          This is a forked repository.
        </p>
      )}

      {repo.description ? (
        <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">{repo.description}</p>
      ) : (
        <p className="italic text-gray-400 mb-6">No description provided.</p>
      )}

      <div className="my-6 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-md border border-gray-100 dark:border-gray-900 text-sm">
        <h4 className="font-semibold mb-2">Stats</h4>
        <p className="text-gray-600 dark:text-gray-400 mb-1">
          Language: {repo.language || "Not specified"} | ⭐ Stars: {repo.stargazers_count} | 🍴 Forks: {repo.forks_count}
        </p>
        <p className="text-gray-400 text-xs">Last Updated: {new Date(repo.updated_at).toLocaleDateString()}</p>
      </div>

      <div className="flex gap-3 mt-8 mb-6">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 rounded hover:bg-gray-800 dark:hover:bg-gray-200 transition duration-200 text-sm font-medium"
        >
          View original on GitHub ↗
        </a>
        
        {projectUrl && shopifyHost && (
          <ShopifyStorefrontEnterButton
            host={shopifyHost}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200 text-sm font-medium"
          />
        )}
        {projectUrl && !shopifyHost && (
          <a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200 text-sm font-medium"
          >
            Open Live Demo ↗
          </a>
        )}

        <a
          href={`/projects/${repo.name}`}
          className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-900 transition duration-200 text-sm font-medium"
        >
          Go to Full Page →
        </a>
      </div>

      {projectUrl && (
        <div className="mt-6 border-t border-gray-100 dark:border-gray-900 pt-6">
          <h3 className="text-lg font-bold mb-2">Live Demo Preview (Desktop)</h3>
          <p className="text-xs text-gray-500 mb-4">
            URL: <a href={projectUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{projectUrl}</a>
            <br />
            <span className="italic">Note: If the preview below is blank, it may be due to the site&apos;s security policy preventing iframe embedding (X-Frame-Options). Click on the URL above to view the site in a new tab.</span>
          </p>
          <div className="mt-4">
            <ProjectDemoPreview src={projectUrl} title={`Live Demo for ${repo.name}`} />
          </div>
        </div>
      )}
    </>
  );
}

export default async function ProjectModal({ params }: ProjectModalProps) {
  const { id } = await params;

  return (
    <ModalOverlay>
      <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-8 rounded-lg w-full shadow-2xl relative border border-gray-100 dark:border-gray-900">
        <div className="flex justify-end mb-2">
          <CloseButton />
        </div>

        <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading...</div>}>
          <ProjectModalDetail id={id} />
        </Suspense>
      </div>
    </ModalOverlay>
  );
}
