import { Button } from "@/components/ui/button";
import { ExternalLink, LucideIcon } from "lucide-react";

interface ResumeButtonProps {
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "glass";
  size?:
    | "default"
    | "xs"
    | "sm"
    | "lg"
    | "icon"
    | "icon-xs"
    | "icon-sm"
    | "icon-lg";
  icon?: LucideIcon;
  children?: React.ReactNode;
}

export default function ResumeButton({
  className,
  variant = "glass",
  size = "lg",
  icon: Icon = ExternalLink,
  children = "View My Resume",
}: ResumeButtonProps) {
  return (
    <Button asChild size={size} variant={variant} className={className}>
      <a
        href="/Resume_Ylya_Martchenko.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2"
      >
        <span>{children}</span>
        <Icon className="w-4 h-4 shrink-0" />
      </a>
    </Button>
  );
}
