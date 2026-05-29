import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGithubRepo } from "@/lib/github";
import { ProjectDetailContent } from "@/components/projects/ProjectDetailContent";
import { ArrowLeft } from "lucide-react";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

async function ProjectDetail({ id }: { id: string }) {
  const { repo, isLive } = await getGithubRepo(id);

  if (!repo) notFound();

  return <ProjectDetailContent repo={repo} isLive={isLive} />;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;

  return (
    <section className="flex-1 flex flex-col px-6 py-12 md:py-20 w-full max-w-5xl mx-auto padding-footer">
      <div className="mb-8">
        <Link 
          href="/projects" 
          className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary text-sm font-semibold transition-all duration-300 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Back to Projects</span>
        </Link>
      </div>

      <Suspense fallback={
        <div className="space-y-10 animate-pulse">
          <div className="h-12 w-1/3 bg-foreground/15 rounded" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-6 w-full bg-foreground/10 rounded" />
              <div className="h-6 w-5/6 bg-foreground/10 rounded" />
              <div className="h-10 w-44 bg-foreground/15 rounded mt-6" />
            </div>
            <div className="h-44 bg-foreground/10 rounded-2xl" />
          </div>
        </div>
      }>
        <ProjectDetail id={id} />
      </Suspense>
    </section>
  );
}
