"use client";

import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import { Button } from "@chaos_team/chaos-ui/ui";
import { PlayIcon, PauseIcon } from "@chaos_team/chaos-ui/ui-icons";

export interface MediaRecorderProps {
  /** Called with the recorded Blob when recording stops. */
  onStop?: (blob: Blob) => void;
  /** Called when recording starts. */
  onStart?: () => void;
  /** MIME type for the recording. Default audio/webm. */
  mimeType?: string;
  /** Whether to record video (screen) instead of audio. Default false. */
  screen?: boolean;
  /** Maximum recording duration in seconds. 0 = unlimited. */
  maxDuration?: number;
  /** Additional class names. */
  className?: string;
}

/**
 * @component MediaRecorder
 * @category business/media
 * @since 1.1.0
 * @description Audio or screen recording component using the MediaRecorder API / 基于 MediaRecorder API 的音频/屏幕录制组件
 * @keywords record, audio, screen, media, microphone, capture
 * @example
 * <MediaRecorder
 *   onStop={(blob) => uploadAudio(blob)}
 *   maxDuration={60}
 * />
 */
function MediaRecorderComponent({
  onStop,
  onStart,
  mimeType = "audio/webm",
  screen,
  maxDuration,
  className,
}: MediaRecorderProps) {
  const [recording, setRecording] = React.useState(false);
  const [elapsed, setElapsed] = React.useState(0);
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const chunksRef = React.useRef<Blob[]>([]);
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const start = React.useCallback(async () => {
    try {
      const stream = screen
        ? await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: true,
          })
        : await navigator.mediaDevices.getUserMedia({ audio: true });

      const recorder = new MediaRecorder(stream, {
        ...(MediaRecorder.isTypeSupported(mimeType) ? { mimeType } : {}),
      });

      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType });
        stream.getTracks().forEach((t) => t.stop());
        onStop?.(blob);
      };

      recorder.start(100);
      mediaRecorderRef.current = recorder;
      setRecording(true);
      setElapsed(0);
      onStart?.();

      timerRef.current = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("[MediaRecorder] Failed to start:", err);
    }
  }, [screen, mimeType, onStop, onStart]);

  const stop = React.useCallback(() => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Auto-stop when maxDuration is reached
  React.useEffect(() => {
    if (maxDuration && elapsed >= maxDuration && recording) {
      stop();
    }
  }, [elapsed, maxDuration, recording, stop]);

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      mediaRecorderRef.current?.stop();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatElapsed = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div
      data-slot="media-recorder"
      className={cn("flex items-center gap-3", className)}
    >
      {recording ? (
        <>
          <div className="flex items-center gap-2">
            <span className="relative flex size-3">
              <span className="bg-destructive absolute inline-flex size-full animate-ping rounded-full opacity-75" />
              <span className="bg-destructive relative inline-flex size-3 rounded-full" />
            </span>
            <span className="font-mono text-sm tabular-nums">
              {formatElapsed(elapsed)}
            </span>
          </div>
          {maxDuration ? (
            <div className="bg-muted h-1 flex-1 rounded">
              <div
                className="bg-destructive h-1 rounded transition-all"
                style={{ width: `${(elapsed / maxDuration) * 100}%` }}
              />
            </div>
          ) : null}
          <Button variant="destructive" size="sm" onClick={stop}>
            <PauseIcon className="mr-1" />
            Stop
          </Button>
        </>
      ) : (
        <Button variant="outline" size="sm" onClick={start}>
          <PlayIcon className="mr-1" />
          {screen ? "Record Screen" : "Record Audio"}
        </Button>
      )}
    </div>
  );
}

export { MediaRecorderComponent as MediaRecorder };
