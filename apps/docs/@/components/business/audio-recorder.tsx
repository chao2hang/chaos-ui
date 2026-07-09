"use client";

import * as React from "react";

import { cn } from "@chaos_team/chaos-ui/lib";
import { Button } from "@chaos_team/chaos-ui/ui";
import {
  MicIcon,
  PauseIcon,
  SquareIcon,
  PlayIcon,
} from "@chaos_team/chaos-ui/ui-icons";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

/**
 * Props for the AudioRecorder component.
 */
interface AudioRecorderProps {
  /** Callback when recording is complete / 录音完成回调 */
  onRecord?: (blob: Blob) => void;
  /** Max recording duration in seconds (default: 60) / 最大录音时长 */
  maxDuration?: number;
  /** Additional className / 额外类名 */
  className?: string;
  /** Show waveform animation (default: true) / 是否显示波形动画 */
  showWaveform?: boolean;
}

/* ------------------------------------------------------------------ */
/*  AudioRecorder - main export                                       */
/* ------------------------------------------------------------------ */

type RecordingState = "idle" | "recording" | "paused" | "stopped";

/**
 * @component AudioRecorder
 * @category business/audio
 * @since 0.2.0
 * @description Audio recording component using the MediaRecorder API with
 *   timer display, waveform animation, and record/pause/stop controls. /
 *   录音组件，使用 MediaRecorder API，支持计时显示、波形动画和录音/暂停/停止控制。
 * @keywords audio, recorder, mic, media-recorder, waveform, voice
 * @example
 * ```tsx
 * <AudioRecorder onRecord={(blob) => console.log(blob)} maxDuration={30} />
 * ```
 */
function AudioRecorder({
  onRecord,
  maxDuration = 60,
  className,
  showWaveform = true,
}: AudioRecorderProps) {
  const [state, setState] = React.useState<RecordingState>("idle");
  const [elapsed, setElapsed] = React.useState(0);
  const [error, setError] = React.useState<string | null>(null);

  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const chunksRef = React.useRef<Blob[]>([]);
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const streamRef = React.useRef<MediaStream | null>(null);

  const cleanup = React.useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    mediaRecorderRef.current = null;
    chunksRef.current = [];
  }, []);

  React.useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setElapsed((prev) => {
        if (prev + 1 >= maxDuration) {
          stopRecording();
          return maxDuration;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const startRecording = async () => {
    setError(null);
    setElapsed(0);
    chunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: "audio/webm",
        });
        if (blob.size > 0) {
          onRecord?.(blob);
        }
        cleanup();
      };

      recorder.start();
      setState("recording");
      startTimer();
    } catch (err) {
      setError(
        err instanceof Error
          ? `无法访问麦克风: ${err.message}`
          : "无法访问麦克风",
      );
    }
  };

  const pauseRecording = () => {
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state === "recording") {
      recorder.pause();
      setState("paused");
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const resumeRecording = () => {
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state === "paused") {
      recorder.resume();
      setState("recording");
      startTimer();
    }
  };

  const stopRecording = () => {
    const recorder = mediaRecorderRef.current;
    if (
      recorder &&
      (recorder.state === "recording" || recorder.state === "paused")
    ) {
      recorder.stop();
      setState("stopped");
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const reset = () => {
    setState("idle");
    setElapsed(0);
    cleanup();
  };

  const formatTime = (s: number): string => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div
      data-slot="audio-recorder"
      className={cn(
        "flex flex-col items-center gap-4 rounded-lg border p-4",
        className,
      )}
    >
      {/* Waveform */}
      {showWaveform && (
        <div className="flex h-12 items-center gap-0.5">
          {Array.from({ length: 32 }).map((_, idx) => (
            <div
              key={idx}
              className={cn(
                "bg-primary/60 w-1 rounded-full",
                state === "recording" && "animate-pulse",
              )}
              style={{
                height:
                  state === "recording"
                    ? `${20 + Math.sin(idx * 0.5) * 15 + (idx % 3) * 3.3}px`
                    : state === "paused"
                      ? "4px"
                      : "4px",
                animationDelay: state === "recording" ? `${idx * 50}ms` : "0ms",
                transition: "height 0.2s ease",
              }}
            />
          ))}
        </div>
      )}

      {/* Timer */}
      <div className="font-mono text-2xl font-medium tabular-nums">
        {formatTime(elapsed)}
        <span className="text-muted-foreground text-sm">
          {" / "}
          {formatTime(maxDuration)}
        </span>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-destructive/10 text-destructive rounded-md px-3 py-1.5 text-sm">
          {error}
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-2">
        {state === "idle" && (
          <Button
            size="icon-lg"
            variant="default"
            onClick={startRecording}
            aria-label="开始录音"
            className="rounded-full bg-red-500 hover:bg-red-600"
          >
            <MicIcon className="size-5" />
          </Button>
        )}

        {state === "recording" && (
          <>
            <Button
              size="icon-lg"
              variant="outline"
              onClick={pauseRecording}
              aria-label="暂停"
              className="rounded-full"
            >
              <PauseIcon className="size-5" />
            </Button>
            <Button
              size="icon-lg"
              variant="default"
              onClick={stopRecording}
              aria-label="停止"
              className="rounded-full bg-red-500 hover:bg-red-600"
            >
              <SquareIcon className="size-4" />
            </Button>
          </>
        )}

        {state === "paused" && (
          <>
            <Button
              size="icon-lg"
              variant="outline"
              onClick={resumeRecording}
              aria-label="继续"
              className="rounded-full"
            >
              <PlayIcon className="size-5" />
            </Button>
            <Button
              size="icon-lg"
              variant="default"
              onClick={stopRecording}
              aria-label="停止"
              className="rounded-full bg-red-500 hover:bg-red-600"
            >
              <SquareIcon className="size-4" />
            </Button>
          </>
        )}

        {state === "stopped" && (
          <Button variant="outline" onClick={reset} className="gap-1.5">
            <MicIcon className="size-4" />
            重新录音
          </Button>
        )}
      </div>

      {/* Status text */}
      <div className="text-muted-foreground text-xs">
        {state === "idle" && "点击开始录音"}
        {state === "recording" && "录音中..."}
        {state === "paused" && "已暂停"}
        {state === "stopped" && "录音完成"}
      </div>
    </div>
  );
}

export { AudioRecorder };
export type { AudioRecorderProps };
