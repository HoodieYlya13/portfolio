// TODO: style this

import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGithubRepo } from "@/lib/github";
import { ProjectDemoPreview } from "@/components/projects/ProjectDemoPreview";
import { ShopifyStorefrontEnterButton } from "@/components/projects/ShopifyStorefrontEnterButton";
import { getShopifyStorefrontHost } from "@/lib/shopify-storefront-previews";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

async function ProjectDetail({ id }: { id: string }) {
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
      <div className="mb-4">
        <p className="text-sm">
          Status:{" "}
          {isLive ? (
            <span className="text-green-500 font-medium">● Live GitHub API Data (Cached 1hr)</span>
          ) : (
            <span className="text-amber-500 font-medium">● Fallback Offline Data</span>
          )}
        </p>
      </div>

      <h1 className="text-4xl font-bold mb-2">{repo.name}</h1>
      
      {repo.fork && (
        <p className="italic text-gray-500 text-sm mb-4">
          This is a forked repository.
        </p>
      )}

      {repo.description ? (
        <p className="text-lg leading-relaxed text-gray-700 mb-6">{repo.description}</p>
      ) : (
        <p className="italic text-gray-400 mb-6">No description provided for this repository.</p>
      )}

      <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-100">
        <h3 className="text-lg font-semibold mb-3">Details</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li><strong>Primary Language:</strong> {repo.language || "Not specified"}</li>
          <li><strong>Stars:</strong> ⭐ {repo.stargazers_count}</li>
          <li><strong>Forks:</strong> 🍴 {repo.forks_count}</li>
          <li><strong>Last Updated:</strong> {new Date(repo.updated_at).toLocaleDateString()}</li>
        </ul>
      </div>

      <div className="mt-8 flex gap-4">
        <a 
          href={repo.html_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition duration-200 text-sm font-medium"
        >
          View original on GitHub ↗
        </a>
        
        {projectUrl && shopifyHost && (
          <ShopifyStorefrontEnterButton
            host={shopifyHost}
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200 text-sm font-medium"
          />
        )}
        {projectUrl && !shopifyHost && (
          <a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200 text-sm font-medium"
          >
            Open Live Demo ↗
          </a>
        )}
      </div>

      {projectUrl && (
        <div className="mt-12">
          <h3 className="text-xl font-bold mb-2">Live Demo Preview (Desktop)</h3>
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

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;

  return (
    <div className="p-8 md:pt-12 md:px-12 max-w-3xl mx-auto pb-40">
      <div className="mb-6">
        <Link href="/projects" className="inline-block text-blue-500 hover:underline text-sm font-medium">
          ← Back to Projects
        </Link>
      </div>
      <Suspense fallback={<div className="p-12 text-center text-gray-500">Loading...</div>}>
        <ProjectDetail id={id} />
      </Suspense>
    </div>
  );
}
