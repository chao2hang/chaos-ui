"use client";
import * as React from "react";

import { cn } from "@chaos_team/chaos-ui/lib";
import { CameraIcon, RefreshCwIcon } from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component MobileCamera
 * @category business/mobile
 * @since 0.7.0
 * @description 移动端相机 — 通过 getUserMedia 调用摄像头预览并拍照，输出 Blob。
 * @keywords mobile, camera
 * @param onCapture 拍照成功回调，参数为图像 Blob（image/jpeg）。
 * @example
 * <MobileCamera onCapture={(blob) => upload(blob)} />
 */

interface MobileCameraProps {
  onCapture?: (blob: Blob) => void;
  className?: string;
}

type Status = "idle" | "starting" | "live" | "denied" | "unsupported";

function MobileCamera({ onCapture, className }: MobileCameraProps) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const streamRef = React.useRef<MediaStream | null>(null);
  const [status, setStatus] = React.useState<Status>("idle");

  const stop = React.useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  const start = React.useCallback(async () => {
    if (
      typeof navigator === "undefined" ||
      !navigator.mediaDevices?.getUserMedia
    ) {
      setStatus("unsupported");
      return;
    }
    setStatus("starting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => undefined);
      }
      setStatus("live");
    } catch {
      setStatus("denied");
    }
  }, []);

  React.useEffect(() => {
    start();
    return stop;
  }, [start, stop]);

  const capture = () => {
    const video = videoRef.current;
    if (!video || status !== "live") return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(
      (blob) => {
        if (blob) onCapture?.(blob);
      },
      "image/jpeg",
      0.9,
    );
  };

  return (
    <div
      data-slot="mobile-camera"
      className={cn(
        "relative flex flex-col overflow-hidden rounded-lg bg-black",
        className,
      )}
    >
      <div className="relative aspect-[3/4] w-full bg-black">
        <video
          ref={videoRef}
          playsInline
          muted
          className="h-full w-full object-cover"
          data-slot="mobile-camera-video"
        />
        {status !== "live" ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center text-sm text-white/80">
            <CameraIcon className="size-8" aria-hidden="true" />
            <span>
              {status === "starting"
                ? "正在启动摄像头…"
                : status === "denied"
                  ? "摄像头访问被拒绝"
                  : status === "unsupported"
                    ? "当前环境不支持摄像头"
                    : "点击下方按钮开启摄像头"}
            </span>
          </div>
        ) : null}
      </div>
      <div className="flex items-center justify-center gap-4 bg-black/80 p-3">
        {status === "live" ? (
          <button
            type="button"
            onClick={capture}
            aria-label="拍照"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-white/30 ring-2 ring-white transition-transform active:scale-95"
          >
            <span className="size-7 rounded-full bg-white" />
          </button>
        ) : (
          <button
            type="button"
            onClick={start}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20"
          >
            <RefreshCwIcon className="size-4" aria-hidden="true" />
            重试
          </button>
        )}
      </div>
    </div>
  );
}

export { MobileCamera };
export type { MobileCameraProps };
