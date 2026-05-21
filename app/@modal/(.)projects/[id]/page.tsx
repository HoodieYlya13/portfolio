import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getGithubRepo } from "@/lib/github";
import CloseButton from "@/components/projects/CloseButton";
import ModalOverlay from "@/components/projects/ModalOverlay";
import { ProjectDetailContent } from "@/components/projects/ProjectDetailContent";

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
      <div className="bg-background/95 dark:bg-background/95 backdrop-blur-xl text-foreground p-6 md:p-8 rounded-2xl w-full max-w-4xl shadow-2xl relative border border-border/80 mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-end mb-4">
          <CloseButton />
        </div>

        <Suspense
          fallback={
            <div className="p-8 text-center text-muted-foreground animate-pulse">
              Loading details...
            </div>
          }
        >
          <ProjectModalDetail id={id} />
        </Suspense>
      </div>
    </ModalOverlay>
  );
}
