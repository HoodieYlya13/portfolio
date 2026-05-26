import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import GetInTouchButton from "@/components/layout/GetInTouchButton";
import Footer from "@/components/layout/Footer";
import { NavigationProvider } from "@/components/layout/NavigationProvider";

export default function PortfolioLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <NavigationProvider>
      <Suspense fallback={null}>
        <GetInTouchButton />
      </Suspense>
      <div className="min-h-screen min-h-dvh">{children}</div>
      {modal}
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      <Footer />
    </NavigationProvider>
  );
}
