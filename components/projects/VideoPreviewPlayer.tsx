"use client";

import { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoPreviewPlayerProps {
  src: string;
  title: string;
  className?: string;
  videoClassName?: string;
}

export default function VideoPreviewPlayer({
  src,
  title,
  className,
  videoClassName,
}: VideoPreviewPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!isManuallyPaused)
            video
              .play()
              .then(() => setIsPlaying(true))
              .catch((error) => {
                console.log(
                  "Autoplay block detected, waiting for interaction:",
                  error,
                );
                setIsPlaying(false);
              });
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      {
        threshold: 0.5,
      },
    );

    observer.observe(video);

    return () => {
      observer.unobserve(video);
      observer.disconnect();
    };
  }, [src, isManuallyPaused]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const checkAudio = () => {
      type AudioDetectVideoElement = HTMLVideoElement & {
        audioTracks?: { length: number };
        mozHasAudio?: boolean;
        webkitAudioDecodedByteCount?: number;
      };
      const v = video as AudioDetectVideoElement;

      const hasAudioTrack = v.audioTracks && v.audioTracks.length > 0;
      const hasFirefoxAudio = v.mozHasAudio === true;
      const hasDecodedAudio =
        v.webkitAudioDecodedByteCount !== undefined &&
        v.webkitAudioDecodedByteCount > 0;

      if (hasAudioTrack || hasFirefoxAudio || hasDecodedAudio)
        setHasAudio(true);
    };

    video.addEventListener("loadedmetadata", checkAudio);
    video.addEventListener("play", checkAudio);
    video.addEventListener("playing", checkAudio);

    checkAudio();
    const checkAudioTimeout = setTimeout(checkAudio, 1000);

    return () => {
      video.removeEventListener("loadedmetadata", checkAudio);
      video.removeEventListener("play", checkAudio);
      video.removeEventListener("playing", checkAudio);
      clearTimeout(checkAudioTimeout);
    };
  }, [src]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
      setIsManuallyPaused(true);
    } else {
      video.play().catch(() => {});
      setIsPlaying(true);
      setIsManuallyPaused(false);
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

    type SafariVideoElement = HTMLVideoElement & {
      webkitEnterFullscreen?: () => void;
      webkitRequestFullscreen?: () => Promise<void>;
      msRequestFullscreen?: () => Promise<void>;
    };

    const v = video as SafariVideoElement;

    if (v.requestFullscreen) v.requestFullscreen().catch(() => {});
    else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen();
    else if (v.webkitRequestFullscreen)
      v.webkitRequestFullscreen().catch(() => {});
    else if (v.msRequestFullscreen) v.msRequestFullscreen().catch(() => {});
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
      className={cn(
        "w-full relative aspect-video bg-black overflow-hidden group select-none cursor-pointer border border-border/40 rounded-2xl",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={src}
        title={title}
        className={cn("w-full h-full object-cover", videoClassName)}
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
                <Pause className="size-4" />
              ) : (
                <Play className="size-4 fill-foreground" />
              )}
            </button>

            {hasAudio && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
                className="p-1.5 rounded-lg hover:bg-foreground/10 text-foreground transition-colors cursor-pointer"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <VolumeX className="size-4" />
                ) : (
                  <Volume2 className="size-4" />
                )}
              </button>
            )}
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
              <Maximize className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
