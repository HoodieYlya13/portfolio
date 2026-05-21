import Link from "next/link";
import { Suspense } from "react";
import CurrentYear from "./CurrentYear";
import FooterProfile from "./FooterProfile";

export default function Footer() {
  return (
    <footer className="absolute bottom-0 w-full flex flex-col justify-end items-center">
      <div
        className="absolute inset-0 bg-linear-to-t from-background to-transparent backdrop-blur-lg"
        style={{
          maskImage: "linear-gradient(to top, black 40%, transparent)",
          WebkitMaskImage: "linear-gradient(to top, black 40%, transparent)",
        }}
      />

      <div className="relative w-full flex flex-col items-center gap-10 py-6 pointer-events-auto">
        <Suspense fallback={null}>
          <FooterProfile />
        </Suspense>

        <div className="w-full flex justify-center items-center text-sm text-muted-foreground border-t border-border px-4 pt-4">
          <span>
            ©{" "}
            <Suspense fallback="2026">
              <CurrentYear />
            </Suspense>{" "}
            <Link href="/" className="hover:underline text-apple-orange">
              HY13dev™
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
