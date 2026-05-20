import { Mail, Phone, type LucideIcon } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../icons/Brands";

type IconType = LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;

const ICONS: Record<string, IconType> = {
  Mail,
  Phone,
  LinkedinIcon,
  GithubIcon,
};

interface ContactIconProps {
  name: string;
  className?: string;
}

export default function ContactIcon({ name, className }: ContactIconProps) {
  const Icon = ICONS[name] ?? Mail;
  return <Icon className={className} aria-hidden />;
}

export function getContactHref(name: string, value: string): string {
  switch (name.toLowerCase()) {
    case "email":
    case "mail":
      return `mailto:${value}`;
    case "phone":
      return `tel:${value.replace(/\s/g, "")}`;
    default:
      return value;
  }
}
