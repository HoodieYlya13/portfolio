import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeScript from "@/components/layout/ThemeScript";
import ThemeToaster from "@/components/layout/ThemeToaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ylya Martchenko - Portfolio",
  description: "Next.js Expert | Software Engineer | Full Stack Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full flex flex-col relative">
        <ThemeToaster />
        <div className="min-h-screen min-h-svh">{children}</div>
      </body>
    </html>
  );
}
