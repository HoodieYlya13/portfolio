import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface ResumeButtonProps {
  className?: string;
}

export default function ResumeButton({ className }: ResumeButtonProps) {
  return (
    <Button
      asChild
      size="lg"
      variant="glass"
      className={`font-semibold px-6 ${className || ""}`}
    >
      <a
        href="/Resume_Ylya_Martchenko.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2"
      >
        View My Resume
        <ExternalLink className="size-5" />
      </a>
    </Button>
  );
}
