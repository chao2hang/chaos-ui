"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PlayIcon, PauseIcon, Volume2Icon } from "@/components/ui/icons";

export interface AudioPlayerProps {
  /** Audio source URL. */
  src: string;
  /** Whether to auto-play on mount. Default false. */
  autoPlay?: boolean;
  /** Whether to show volume control. Default true. */
  showVolume?: boolean;
  /** Whether to show playback speed selector. Default false. */
  showSpeed?: boolean;
  /** Additional class names. */
  className?: string;
  /** Called when playback ends. */
  onEnded?: () => void;
  /** Called on play/pause/timeline interaction. */
  onPlay?: () => void;
  onPause?: () => void;
}

/**
 * @component AudioPlayer
 * @category ui/media
 * @since 1.1.0
 * @description Styled audio player with play/pause, seek bar, volume, and speed controls / 带播放/暂停、进度条、音量、倍速的音频播放器
 * @keywords audio, player, media, playback, music, podcast
 * @example
 * <AudioPlayer src="/demo.mp3" />
 */
function AudioPlayer({
  src,
  autoPlay,
  showVolume = true,
  showSpeed,
  className,
  onEnded,
  onPlay,
  onPause,
}: AudioPlayerProps) {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(1);
  const [muted, setMuted] = React.useState(false);
  const [speed, setSpeed] = React.useState(1);

  const togglePlay = React.useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      void a.play();
      onPlay?.();
    } else {
      a.pause();
      onPause?.();
    }
  }, [onPlay, onPause]);

  const handleTimeUpdate = React.useCallback(() => {
    const a = audioRef.current;
    if (a) setCurrentTime(a.currentTime);
  }, []);

  const handleLoadedMetadata = React.useCallback(() => {
    const a = audioRef.current;
    if (a) setDuration(a.duration);
  }, []);

  const handleSeek = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const a = audioRef.current;
      if (a) {
        a.currentTime = Number(e.target.value);
        setCurrentTime(a.currentTime);
      }
    },
    [],
  );

  const handleVolumeChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = Number(e.target.value);
      const a = audioRef.current;
      if (a) {
        a.volume = v;
        a.muted = v === 0;
      }
      setVolume(v);
      setMuted(v === 0);
    },
    [],
  );

  const toggleMute = React.useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = !a.muted;
    setMuted(a.muted);
  }, []);

  const changeSpeed = React.useCallback((s: number) => {
    const a = audioRef.current;
    if (a) a.playbackRate = s;
    setSpeed(s);
  }, []);

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  return (
    <div
      data-slot="audio-player"
      className={cn(
        "bg-card flex items-center gap-2 rounded-lg border p-3",
        className,
      )}
    >
      <audio
        ref={audioRef}
        src={src}
        autoPlay={autoPlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={onEnded}
      />

      <Button
        variant="ghost"
        size="icon-sm"
        onClick={togglePlay}
        aria-label={playing ? "Pause" : "Play"}
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </Button>

      <div className="flex flex-1 items-center gap-2">
        <span className="text-muted-foreground w-10 text-right text-xs tabular-nums">
          {formatTime(currentTime)}
        </span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          className="accent-primary h-1 flex-1"
          onChange={handleSeek}
        />
        <span className="text-muted-foreground w-10 text-xs tabular-nums">
          {formatTime(duration)}
        </span>
      </div>

      {showVolume && (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={toggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted || volume === 0 ? (
              <Volume2Icon className="text-muted-foreground" />
            ) : (
              <Volume2Icon />
            )}
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
      )}

      {showSpeed && (
        <select
          value={speed}
          onChange={(e) => changeSpeed(Number(e.target.value))}
          className="bg-background rounded border px-1.5 py-0.5 text-xs"
        >
          {speeds.map((s) => (
            <option key={s} value={s}>
              {s}x
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export { AudioPlayer };
