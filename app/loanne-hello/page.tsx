"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Download,
  Loader2,
  Sparkles,
  RotateCcw,
  BookOpen,
} from "lucide-react";

const PORTFOLIOS = [
  {
    id: "creatif",
    title: "Portfolio Créatif",
    description: "Conception graphique, branding, et créations visuelles",
    url: "/loanne_hello/Portfolio_créatif.pdf",
    size: "47.7 Mo",
  },
  {
    id: "professionnel",
    title: "Portfolio Professionnel",
    description: "Projets d'entreprise, marketing, et réalisations éditoriales",
    url: "/loanne_hello/Portfolio_professionnel.pdf",
    size: "11.3 Mo",
  },
];

export default function LoanneHelloPage() {
  const [mounted, setMounted] = useState(false);
  const [currentPortfolio, setCurrentPortfolio] = useState(PORTFOLIOS[0]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pdfjs, setPdfjs] = useState<any>(null);
  const [loadingLibrary, setLoadingLibrary] = useState(true);
  const [loadingPdf, setLoadingPdf] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [zoom, setZoom] = useState(1.0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRendering, setIsRendering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderTaskRef = useRef<any>(null);

  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("type") === "pro")
      setTimeout(() => setCurrentPortfolio(PORTFOLIOS[1]), 0);
  }, []);

  const handlePortfolioChange = (port: (typeof PORTFOLIOS)[0]) => {
    if (port.id === currentPortfolio.id) return;

    setCurrentPortfolio(port);
    setLoadingPdf(true);
    setLoadingProgress(0);
    setPdfDoc(null);
    setPageNum(1);
    setError(null);

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (port.id === "professionnel") url.searchParams.set("type", "pro");
      else url.searchParams.delete("type");
      window.history.replaceState({}, "", url.toString());
    }
  };

  const nextPage = () => {
    setPageNum((prev) => (prev < numPages ? prev + 1 : prev));
  };

  const prevPage = () => {
    setPageNum((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const zoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.15, 3.0));
  };

  const zoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.15, 0.5));
  };

  const resetZoom = () => {
    setZoom(1.0);
  };

  const toggleFullscreen = () => {
    if (typeof document === "undefined") return;

    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      elem
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch((err) => {
          console.error("Could not activate fullscreen mode:", err);
        });
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch((err) => {
          console.error("Could not exit fullscreen mode:", err);
        });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const minSwipe = 60;

    if (Math.abs(diff) > minSwipe) {
      if (diff > 0) nextPage();
      else prevPage();
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const loadLibrary = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((window as any).pdfjsLib) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const lib = (window as any).pdfjsLib;
          lib.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
          lib.GlobalWorkerOptions.workerPort = null; // Clear stale worker ports from back-button navigations
          setPdfjs(lib);
          setLoadingLibrary(false);
          return;
        }

        const script = document.createElement("script");
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
        script.async = true;

        script.onload = () => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const lib = (window as any).pdfjsLib;
          if (lib) {
            lib.GlobalWorkerOptions.workerSrc =
              "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
            lib.GlobalWorkerOptions.workerPort = null;
            setPdfjs(lib);
          } else
            setError(
              "Impossible d'initialiser la bibliothèque du visualiseur PDF.",
            );
          setLoadingLibrary(false);
        };

        script.onerror = () => {
          setError(
            "Échec du chargement des scripts du visualiseur PDF. Veuillez vérifier votre connexion internet.",
          );
          setLoadingLibrary(false);
        };

        document.body.appendChild(script);
      } catch {
        setError(
          "Une erreur inattendue est survenue lors de la configuration du lecteur PDF.",
        );
        setLoadingLibrary(false);
      }
    };

    loadLibrary();
  }, [mounted]);

  useEffect(() => {
    if (!pdfjs || !currentPortfolio) return;

    let active = true;

    const loadingTask = pdfjs.getDocument(currentPortfolio.url);

    loadingTask.onProgress = (progressData: {
      loaded: number;
      total: number;
    }) => {
      if (progressData.total > 0 && active) {
        const percentage = Math.round(
          (progressData.loaded / progressData.total) * 100,
        );
        setLoadingProgress(percentage);
      }
    };

    loadingTask.promise.then(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (doc: any) => {
        if (active) {
          setPdfDoc(doc);
          setNumPages(doc.numPages);
          setLoadingPdf(false);
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (err: any) => {
        console.error("Error loading PDF: ", err);
        if (active) {
          setError(
            "Impossible de charger le fichier PDF. Il est peut-être temporairement indisponible.",
          );
          setLoadingPdf(false);
        }
      },
    );

    return () => {
      active = false;
      loadingTask.destroy();
    };
  }, [pdfjs, currentPortfolio]);

  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;

    let active = true;

    const triggerRender = async () => {
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch {
          // ignore
        }
      }

      try {
        setIsRendering(true);
        const page = await pdfDoc.getPage(pageNum);
        if (!active || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const unscaledViewport = page.getViewport({ scale: 1.0 });

        const container = viewerRef.current;
        const containerWidth = container ? container.clientWidth : 800;
        const containerHeight = container ? container.clientHeight : 600;

        const padX = containerWidth < 768 ? 16 : 48;
        const padY = containerWidth < 768 ? 16 : 48;
        const targetW = Math.max(containerWidth - padX, 200);
        const targetH = Math.max(containerHeight - padY, 200);

        const scaleX = targetW / unscaledViewport.width;
        const scaleY = targetH / unscaledViewport.height;

        const fitScale = Math.min(scaleX, scaleY);
        const finalScale = fitScale * zoom;
        const viewport = page.getViewport({ scale: finalScale });

        const dpr =
          typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

        // Double Buffering: Create an offscreen canvas to render the page in the background
        const offscreenCanvas = document.createElement("canvas");
        offscreenCanvas.width = viewport.width * dpr;
        offscreenCanvas.height = viewport.height * dpr;

        const offscreenCtx = offscreenCanvas.getContext("2d");
        if (!offscreenCtx) return;
        offscreenCtx.scale(dpr, dpr);

        const renderContext = {
          canvasContext: offscreenCtx,
          viewport: viewport,
        };

        const renderTask = page.render(renderContext);
        renderTaskRef.current = renderTask;

        await renderTask.promise;

        if (active && canvasRef.current) {
          const visibleCanvas = canvasRef.current;
          const visibleCtx = visibleCanvas.getContext("2d");
          if (visibleCtx) {
            // Match dimensions and instantly copy the rendered image from offscreen
            visibleCanvas.width = offscreenCanvas.width;
            visibleCanvas.height = offscreenCanvas.height;
            visibleCanvas.style.width = `${viewport.width}px`;
            visibleCanvas.style.height = `${viewport.height}px`;
            visibleCtx.drawImage(offscreenCanvas, 0, 0);
          }
          setIsRendering(false);
          renderTaskRef.current = null;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (
          err.name === "RenderingCancelledException" ||
          err.message?.includes("cancelled")
        )
          return;

        console.error("PDF render task error: ", err);
        if (active) setIsRendering(false);
      }
    };

    triggerRender();

    return () => {
      active = false;
    };
  }, [pdfDoc, pageNum, zoom, windowSize]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Right") nextPage();
      else if (e.key === "ArrowLeft" || e.key === "Left") prevPage();
      else if (e.key === "=" || e.key === "+") zoomIn();
      else if (e.key === "-") zoomOut();
      else if (e.key === "0") resetZoom();
      else if (e.key === "f" || e.key === "F") toggleFullscreen();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdfDoc, pageNum, numPages]);

  if (!mounted)
    return (
      <div className="flex min-h-svh items-center justify-center bg-zinc-950 text-zinc-100">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-[#417d43]" />
          <p className="text-sm text-zinc-400">
            Chargement de l&apos;espace portfolio...
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-svh flex flex-col bg-zinc-950 text-zinc-100 relative overflow-hidden select-none font-sans">
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#417d43]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#417d43]/5 blur-[100px] pointer-events-none" />

      <header className="z-10 flex items-center justify-center sm:justify-between p-3 border-b border-zinc-900 bg-zinc-950/70 backdrop-blur-md">
        <div className="hidden sm:flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#417d43] bg-[#417d43]/10 px-2 py-0.5 rounded">
                Exposition
              </span>
              <Sparkles className="h-4 w-4 text-[#417d43] animate-pulse" />
            </div>
            <h1 className="text-lg font-bold text-zinc-100 tracking-tight">
              Portfolios de Loanne
            </h1>
          </div>
        </div>

        <div className="flex rounded-xl bg-zinc-900 p-1 border border-zinc-800/80 shadow-inner">
          {PORTFOLIOS.map((port) => {
            const isActive = currentPortfolio.id === port.id;
            return (
              <button
                key={port.id}
                onClick={() => {
                  if (!loadingPdf && !isRendering) {
                    handlePortfolioChange(port);
                  }
                }}
                disabled={loadingPdf || isRendering}
                className={`px-4 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-[#417d43] text-white shadow-md scale-[1.02]"
                    : "text-zinc-400 hover:text-zinc-200 disabled:opacity-50"
                }`}
              >
                {port.title}
              </button>
            );
          })}
        </div>
      </header>

      <main
        className="flex-1 w-full relative bg-zinc-900/40"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={viewerRef}
          className="absolute inset-0 flex items-center justify-center overflow-hidden py-8 px-4"
          style={{
            cursor: isRendering ? "wait" : "default",
          }}
        >
          {loadingLibrary && (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-10 w-10 animate-spin text-[#417d43]" />
              <p className="text-sm text-zinc-400">
                Initialisation du moteur de rendu haute définition...
              </p>
            </div>
          )}

          {!loadingLibrary && loadingPdf && (
            <div className="flex flex-col items-center gap-4 w-full max-w-xs bg-zinc-950/80 border border-zinc-900 p-6 rounded-2xl backdrop-blur-md shadow-2xl">
              <BookOpen className="h-8 w-8 text-[#417d43] animate-bounce" />
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#417d43] h-full rounded-full transition-all duration-300"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <p className="text-xs text-zinc-400">
                Chargement du {currentPortfolio.title} ({loadingProgress}%)
              </p>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center gap-4 bg-red-950/20 border border-red-900/50 p-8 rounded-2xl max-w-md text-center shadow-lg">
              <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 text-xl font-bold">
                !
              </div>
              <h3 className="font-bold text-zinc-200">
                Une erreur est survenue
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {error ===
                "Failed to load PDF viewer scripts. Please check your internet connection."
                  ? "Impossible de charger les scripts nécessaires. Veuillez vérifier votre connexion internet."
                  : "Impossible de charger le fichier PDF. Il est peut-être temporairement indisponible."}
              </p>
              <button
                onClick={() => {
                  setError(null);
                  setMounted(false);
                  setTimeout(() => setMounted(true), 100);
                }}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs rounded-lg transition"
              >
                Réessayer
              </button>
            </div>
          )}

          {!loadingLibrary && !loadingPdf && !error && pdfDoc && (
            <div className="relative shadow-[0_24px_70px_rgba(0,0,0,0.7)] rounded-2xl overflow-hidden border border-zinc-800 bg-white">
              <canvas
                ref={canvasRef}
                className="block transition-transform duration-100 ease-out"
              />

            </div>
          )}
        </div>
      </main>

      {!loadingLibrary && !loadingPdf && !error && pdfDoc && (
        <div className="z-10 p-3 flex justify-center items-center bg-zinc-950 border-t border-zinc-900 w-full">
          <div className="flex flex-wrap items-center gap-3 px-4 py-2 rounded-full bg-zinc-900/60 border border-zinc-800 shadow-2xl max-w-[95%] sm:max-w-max justify-center">
            <div className="flex items-center gap-1.5 sm:border-r sm:border-zinc-800 sm:pr-3">
              <button
                onClick={prevPage}
                disabled={pageNum <= 1}
                aria-label="Previous page"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 disabled:opacity-30 disabled:hover:bg-transparent transition"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex items-center text-xs md:text-sm font-medium text-zinc-300 px-1 select-none">
                <span className="text-[#417d43] font-bold">{pageNum}</span>
                <span className="text-zinc-600 px-1">/</span>
                <span className="text-zinc-400">{numPages}</span>
              </div>

              <button
                onClick={nextPage}
                disabled={pageNum >= numPages}
                aria-label="Next page"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 disabled:opacity-30 disabled:hover:bg-transparent transition"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <button
                onClick={resetZoom}
                disabled={zoom === 1.0}
                aria-label="Reset zoom"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-[#417d43] hover:bg-zinc-900 disabled:opacity-20 transition sm:hidden border-l border-zinc-800/80 pl-1.5 ml-0.5"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>

              <a
                href={currentPortfolio.url}
                download
                aria-label="Download portfolio PDF"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-[#417d43] hover:bg-zinc-900 transition sm:hidden"
              >
                <Download className="h-4 w-4" />
              </a>
            </div>

            <div className="hidden sm:flex items-center gap-1 border-r border-zinc-800 pr-3">
              <button
                onClick={zoomOut}
                disabled={zoom <= 0.5}
                aria-label="Zoom out"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 disabled:opacity-30 transition"
              >
                <ZoomOut className="h-4 w-4" />
              </button>

              <span className="text-xs font-semibold text-zinc-400 px-1 select-none w-10 text-center">
                {Math.round(zoom * 100)}%
              </span>

              <button
                onClick={zoomIn}
                disabled={zoom >= 3.0}
                aria-label="Zoom in"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 disabled:opacity-30 transition"
              >
                <ZoomIn className="h-4 w-4" />
              </button>

              <button
                onClick={resetZoom}
                disabled={zoom === 1.0}
                aria-label="Reset zoom"
                className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900 disabled:opacity-20 transition"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-1.5">
              <button
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? "Exit full screen" : "Full screen"}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition"
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </button>

              <a
                href={currentPortfolio.url}
                download
                aria-label="Download portfolio PDF"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition"
              >
                <Download className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {!loadingLibrary && !loadingPdf && !error && pdfDoc && (
        <div className="absolute right-4 bottom-4 text-[10px] text-zinc-600 hidden md:block select-none pointer-events-none">
          Flèches ← et → pour naviguer • Touches + et - pour zoomer • Touche F pour plein écran
        </div>
      )}
    </div>
  );
}
