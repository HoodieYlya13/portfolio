import Link from "next/link";
import CurrentYear from "./CurrentYear";

export default function Footer() {
  return (
    <footer className="w-full py-6 mt-auto flex justify-center items-center text-sm text-muted-foreground border-t border-border">
      <span>
        © <CurrentYear />{" "}
        <Link href="/" className="hover:underline text-foreground">
          HY13dev™
        </Link>
        . All Rights Reserved.
      </span>
    </footer>
  );
}
