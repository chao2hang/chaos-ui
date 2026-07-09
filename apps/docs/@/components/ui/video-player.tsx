"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PlayIcon, PauseIcon, Volume2Icon } from "@/components/ui/icons";

export interface VideoPlayerProps {
  /** Video source URL. */
  src: string;
  /** Poster image URL. */
  poster?: string;
  /** Whether to auto-play on mount. Default false. */
  autoPlay?: boolean;
  /** Whether to show controls overlay. Default true. */
  showControls?: boolean;
  /** Additional class names for the wrapper. */
  className?: string;
  /** Called when playback ends. */
  onEnded?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
}

/**
 * @component VideoPlayer
 * @category ui/media
 * @since 1.1.0
 * @description Styled video player with play/pause, seek bar, volume, and fullscreen toggle / 带播放/暂停、进度条、音量、全屏的视频播放器
 * @keywords video, player, media, playback
 * @example
 * <VideoPlayer src="/demo.mp4" poster="/poster.jpg" />
 */
function VideoPlayer({
  src,
  poster,
  autoPlay,
  showControls = true,
  className,
  onEnded,
  onPlay,
  onPause,
}: VideoPlayerProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(1);
  const [muted, setMuted] = React.useState(false);
  const [hovering, setHovering] = React.useState(false);

  const togglePlay = React.useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      onPlay?.();
    } else {
      v.pause();
      onPause?.();
    }
  }, [onPlay, onPause]);

  const handleTimeUpdate = React.useCallback(() => {
    const v = videoRef.current;
    if (v) setCurrentTime(v.currentTime);
  }, []);

  const handleLoadedMetadata = React.useCallback(() => {
    const v = videoRef.current;
    if (v) setDuration(v.duration);
  }, []);

  const handleSeek = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = videoRef.current;
      if (v) {
        v.currentTime = Number(e.target.value);
        setCurrentTime(v.currentTime);
      }
    },
    [],
  );

  const handleVolumeChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = Number(e.target.value);
      const v = videoRef.current;
      if (v) {
        v.volume = val;
        v.muted = val === 0;
      }
      setVolume(val);
      setMuted(val === 0);
    },
    [],
  );

  const toggleMute = React.useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  const toggleFullscreen = React.useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void v.requestFullscreen();
    }
  }, []);

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div
      data-slot="video-player"
      className={cn(
        "group relative overflow-hidden rounded-lg bg-black",
        className,
      )}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        className="w-full"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={onEnded}
        onClick={togglePlay}
      />

      {showControls && (
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8 transition-opacity",
            !playing || hovering ? "opacity-100" : "opacity-0",
          )}
        >
          {/* Seek bar */}
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            className="accent-primary mb-2 h-1 w-full"
            onChange={handleSeek}
          />

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={togglePlay}
              aria-label={playing ? "Pause" : "Play"}
              className="text-white hover:text-white"
            >
              {playing ? <PauseIcon /> : <PlayIcon />}
            </Button>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={toggleMute}
                aria-label={muted ? "Unmute" : "Mute"}
                className="text-white hover:text-white"
              >
                <Volume2Icon className={muted ? "text-muted-foreground" : ""} />
              </Button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={muted ? 0 : volume}
                className="accent-primary h-1 w-16"
                onChange={handleVolumeChange}
              />
            </div>

            <span className="ml-auto text-xs text-white/80 tabular-nums">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            <Button
              variant="ghost"
              size="icon-xs"
              onClick={toggleFullscreen}
              aria-label="Fullscreen"
              className="text-white hover:text-white"
            >
              <svg
                className="size-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
              </svg>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export { VideoPlayer };
