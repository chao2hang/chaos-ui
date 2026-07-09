"use client";
import * as React from "react";
import {
  MediaPlayer,
  MediaOutlet,
  MediaPlayButton,
  MediaMuteButton,
  MediaTimeSlider,
  MediaVolumeSlider,
  MediaTime,
  MediaBufferingIndicator,
} from "@vidstack/react";
import {
  PlayIcon,
  PauseIcon,
  Volume2Icon,
  VolumeXIcon,
  SkipBackIcon,
  SkipForwardIcon,
  Loader2Icon,
} from "lucide-react";
import { cn } from "@chaos_team/chaos-ui/lib";
import { Button } from "@chaos_team/chaos-ui/ui";

export interface AudioPlayerProps {
  src: string;
  title?: string;
  artist?: string;
  cover?: string;
  className?: string;
}

export function AudioPlayer({
  src,
  title,
  artist,
  cover,
  className,
}: AudioPlayerProps) {
  return (
    <div
      data-slot="audio-player"
      className={cn(
        "bg-card flex items-center gap-3 rounded-md border p-3",
        className,
      )}
    >
      <MediaPlayer src={src} className="group contents">
        <MediaOutlet className="hidden" />

        {cover && (
          <img
            src={cover}
            alt={title ?? "cover"}
            className="size-12 rounded object-cover"
          />
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <MediaBufferingIndicator className="flex items-center">
              <Loader2Icon className="text-muted-foreground size-3 animate-spin" />
            </MediaBufferingIndicator>
            <div className="truncate text-sm font-medium">{title}</div>
          </div>
          {artist && (
            <div className="text-muted-foreground truncate text-xs">
              {artist}
            </div>
          )}

          <div className="mt-1.5 flex items-center gap-1">
            <MediaTimeSlider className="group/slider relative flex h-4 flex-1 cursor-pointer items-center">
              <div className="bg-muted relative h-1 w-full rounded-full">
                <div
                  className="bg-primary absolute inset-y-0 left-0 h-full rounded-full"
                  style={{ width: "var(--slider-fill-percent)" }}
                />
                <div
                  className="bg-primary absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 shadow-sm group-hover/slider:opacity-100"
                  style={{ left: "var(--slider-pointer-percent)" }}
                />
              </div>
            </MediaTimeSlider>
            <span className="text-muted-foreground w-20 text-right text-[0.65rem] tabular-nums">
              <MediaTime type="current" />
              <span> / </span>
              <MediaTime type="duration" />
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-0.5">
          <AudioSeekButton
            seconds={-10}
            icon={<SkipBackIcon />}
            label="后退 10 秒"
          />
          <MediaPlayButton className="hover:bg-accent flex size-8 items-center justify-center rounded-full transition-colors">
            <PlayIcon className="hidden size-4 group-data-[paused]:block" />
            <PauseIcon className="size-4 group-data-[paused]:hidden" />
          </MediaPlayButton>
          <AudioSeekButton
            seconds={10}
            icon={<SkipForwardIcon />}
            label="前进 10 秒"
          />
          <MediaMuteButton className="hover:bg-accent flex size-7 items-center justify-center rounded-full transition-colors">
            <Volume2Icon className="size-4 group-data-[muted]:hidden" />
            <VolumeXIcon className="hidden size-4 group-data-[muted]:block" />
          </MediaMuteButton>
          <MediaVolumeSlider className="group/vol relative flex h-7 w-16 cursor-pointer items-center">
            <div className="bg-muted relative h-1 w-full rounded-full">
              <div
                className="bg-foreground absolute inset-y-0 left-0 h-full rounded-full"
                style={{ width: "var(--slider-fill-percent)" }}
              />
              <div
                className="bg-foreground absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 shadow-sm group-hover/vol:opacity-100"
                style={{ left: "var(--slider-pointer-percent)" }}
              />
            </div>
          </MediaVolumeSlider>
        </div>
      </MediaPlayer>
    </div>
  );
}

function AudioSeekButton({
  seconds,
  icon,
  label,
}: {
  seconds: number;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Button
      variant="ghost"
      size="icon-xs"
      className="text-muted-foreground hover:text-foreground"
      onClick={(e) => {
        const player = (e.currentTarget as HTMLElement).closest(
          "media-player",
        ) as HTMLElement & { currentTime: number; duration: number };
        if (player) {
          player.currentTime = Math.max(
            0,
            Math.min(player.currentTime + seconds, player.duration || Infinity),
          );
        }
      }}
      aria-label={label}
    >
      {icon}
    </Button>
  );
}
