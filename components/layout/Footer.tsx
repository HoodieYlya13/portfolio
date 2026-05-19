import Link from "next/link";
import CurrentYear from "./CurrentYear";
import { Suspense } from "react";

export default function Footer() {
  return (
    <footer className="absolute bottom-0 w-full h-40 flex justify-center items-end">
      <div 
        className="absolute inset-0 bg-linear-to-t from-background to-transparent backdrop-blur-lg"
        style={{
          maskImage: "linear-gradient(to top, black 40%, transparent)",
          WebkitMaskImage: "linear-gradient(to top, black 40%, transparent)",
        }}
      />
      
      <div className="relative z-10 w-full py-6 flex justify-center items-center text-sm text-muted-foreground border-t border-border">
        <span>
          © <Suspense fallback="2026"><CurrentYear /></Suspense>{" "}
          <Link href="/" className="hover:underline text-apple-orange">
            HY13dev™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
