"use client";

import { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

interface VideoPreviewPlayerProps {
  src: string;
  title: string;
}

export default function VideoPreviewPlayer({
  src,
  title,
}: VideoPreviewPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playPromise = video.play();
    if (playPromise !== undefined)
      playPromise.catch((error) => {
        console.log(
          "Autoplay block detected, waiting for user interaction:",
          error,
        );
        setIsPlaying(false);
      });
  }, [src]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.requestFullscreen) video.requestFullscreen();
    else {
      type PrefixedVideoElement = HTMLVideoElement & {
        webkitRequestFullscreen?: () => Promise<void>;
        msRequestFullscreen?: () => Promise<void>;
      };
      const prefixedVideo = video as PrefixedVideoElement;
      if (prefixedVideo.webkitRequestFullscreen)
        prefixedVideo.webkitRequestFullscreen();
      else if (prefixedVideo.msRequestFullscreen)
        prefixedVideo.msRequestFullscreen();
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 2500);
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  return (
    <div
      className="w-full relative aspect-video bg-black overflow-hidden group select-none cursor-pointer border border-border/40 rounded-2xl"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={src}
        title={title}
        className="w-full h-full object-cover"
        loop
        muted
        playsInline
        autoPlay
      />

      <div
        className={`absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent flex flex-col justify-end p-4 transition-opacity duration-300 ${
          showControls || !isPlaying ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center justify-between bg-card/45 dark:bg-card/25 backdrop-blur-md px-4 py-2.5 rounded-xl border border-foreground/10 dark:border-foreground/5 shadow-lg">
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="p-1.5 rounded-lg hover:bg-foreground/10 text-foreground transition-colors cursor-pointer"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 fill-foreground" />
              )}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMute();
              }}
              className="p-1.5 rounded-lg hover:bg-foreground/10 text-foreground transition-colors cursor-pointer"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded border border-border/40 uppercase tracking-wider">
              Autoplay Loop
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleFullscreen();
              }}
              className="p-1.5 rounded-lg hover:bg-foreground/10 text-foreground transition-colors cursor-pointer"
              aria-label="Fullscreen"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
