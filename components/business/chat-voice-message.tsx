"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MicIcon, PauseIcon, PlayIcon } from "@/components/ui/icons";

/**
 * @component ChatVoiceMessage
 * @category business/chat
 * @since 0.7.0
 * @description 语音消息（播放/暂停 + 进度波形）
 * @keywords chat, voice, message
 * @example
 * <ChatVoiceMessage duration={12} src="/a.mp3" />
 */

interface ChatVoiceMessageProps {
  duration: number;
  src?: string;
  className?: string;
}

function formatSeconds(total: number): string {
  const m = Math.floor(total / 60);
  const s = Math.floor(total % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function ChatVoiceMessage({ duration, src, className }: ChatVoiceMessageProps) {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0); // 0..1

  const toggle = React.useCallback(() => {
    const el = audioRef.current;
    if (!el) {
      setPlaying((p) => !p);
      return;
    }
    if (playing) {
      el.pause();
    } else {
      void el.play().catch(() => setPlaying(false));
    }
  }, [playing]);

  React.useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onTime = () => {
      if (el.duration > 0) setProgress(el.currentTime / el.duration);
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => {
      setPlaying(false);
      setProgress(0);
    };
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("ended", onEnded);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("ended", onEnded);
    };
  }, []);

  const bars = 24;
  const currentBar = Math.round(progress * bars);

  return (
    <div
      data-slot="chat-voice-message"
      className={cn("inline-flex items-center gap-2 rounded-2xl bg-muted px-3 py-2", className)}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={toggle}
        aria-label={playing ? "Pause voice message" : "Play voice message"}
      >
        {playing ? <PauseIcon className="size-4" aria-hidden /> : <PlayIcon className="size-4" aria-hidden />}
      </Button>
      <MicIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
      <div
        className="flex h-6 items-center gap-0.5"
        role="progressbar"
        aria-label="Voice playback progress"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {Array.from({ length: bars }, (_, i) => (
          <span
            key={i}
            className={cn(
              "w-0.5 rounded-full",
              i < currentBar ? "bg-primary" : "bg-muted-foreground/40",
            )}
            style={{ height: `${30 + ((i * 37) % 70)}%` }}
            aria-hidden
          />
        ))}
      </div>
      <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
        {formatSeconds(duration)}
      </span>
      {src ? <audio ref={audioRef} src={src} preload="none" /> : null}
    </div>
  );
}

export { ChatVoiceMessage };
export type { ChatVoiceMessageProps };
