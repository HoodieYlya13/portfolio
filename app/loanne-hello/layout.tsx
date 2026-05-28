import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolios de Loanne",
  description: "Découvrez les portfolios créatifs et professionnels de Loanne Hello.",
  icons: {
    icon: "/loanne_hello/memoji_minus.ico",
    shortcut: "/loanne_hello/memoji_minus.ico",
    apple: "/loanne_hello/memoji_minus.ico",
  },
};

export default function LoanneHelloLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
