"use client";

import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/utils/config";
import LocaleSwitcher from "./LocaleSwitcher";
import { LocaleLanguages } from "@/i18n/utils";
import ThemeSwitcher from "./ThemeSwitcher";

interface NavBarClientProps {
  locale: LocaleLanguages;
  localeMismatch?: LocaleLanguages;
}

export default function NavBarClient({
  locale,
  localeMismatch,
}: NavBarClientProps) {
  return (
    <nav className="w-full flex items-center justify-between px-4 bg-background">
      <Link href="/" className="flex items-center gap-2 md:gap-3">
        <Image
          src="/favicon.ico"
          alt="Logo"
          width={40}
          height={40}
          className="size-10 select-none"
          priority
        />
        <span>{APP_NAME}</span>
      </Link>

      <div className="flex items-center gap-2">
        <ThemeSwitcher />

        <LocaleSwitcher storedLocale={locale} localeMismatch={localeMismatch} />
      </div>
    </nav>
  );
}
