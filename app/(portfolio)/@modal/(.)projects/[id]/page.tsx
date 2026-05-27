import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getGithubRepo } from "@/lib/github";
import CloseButton from "@/components/projects/CloseButton";
import ModalOverlay from "@/components/projects/ModalOverlay";
import { ProjectDetailContent } from "@/components/projects/ProjectDetailContent";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

interface ProjectModalProps {
  params: Promise<{ id: string }>;
}

async function ProjectModalDetail({ id }: { id: string }) {
  const { repo, isLive } = await getGithubRepo(id);

  if (!repo) notFound();

  return <ProjectDetailContent repo={repo} isLive={isLive} isModal={true} />;
}

export default async function ProjectModal({ params }: ProjectModalProps) {
  const { id } = await params;

  return (
    <ModalOverlay>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] md:w-full max-w-4xl max-h-[90%] overflow-y-auto overscroll-contain cursor-default bg-background p-6 md:p-8 rounded-2xl shadow-2xl border border-border">
        <div className="flex justify-end mb-4">
          <CloseButton />
        </div>

        <Suspense
          fallback={<LoadingSpinner className="min-h-[50vh] min-h-[50svh]" />}
        >
          <ProjectModalDetail id={id} />
        </Suspense>
      </div>
    </ModalOverlay>
  );
}
