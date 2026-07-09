"use client";

import * as React from "react";

import { cn } from "@chaos_team/chaos-ui/lib";
import { Button } from "@chaos_team/chaos-ui/ui";
import {
  MonitorIcon,
  CameraIcon,
  DownloadIcon,
  Trash2Icon,
} from "@chaos_team/chaos-ui/ui-icons";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

/**
 * Props for the ScreenCapture component.
 */
interface ScreenCaptureProps {
  /** Callback when a frame is captured / 截图完成回调 */
  onCapture?: (dataUrl: string) => void;
  /** Additional className / 额外类名 */
  className?: string;
  /** Show toolbar buttons (default: true) / 是否显示工具栏 */
  toolbar?: boolean;
}

/* ------------------------------------------------------------------ */
/*  ScreenCapture - main export                                       */
/* ------------------------------------------------------------------ */

interface AnnotationRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * @component ScreenCapture
 * @category business/screen
 * @since 0.2.0
 * @description Screen capture and annotation component using
 *   getDisplayMedia for screen sharing. Captures a frame to canvas and
 *   provides basic rectangle annotation with draw, clear, and download. /
 *   屏幕截图和标注组件，使用 getDisplayMedia 进行屏幕共享，将帧捕获到画布，
 *   并提供基本矩形标注功能，包括绘制、清除和下载。
 * @keywords screen, capture, screenshot, annotation, canvas, display-media
 * @example
 * ```tsx
 * <ScreenCapture onCapture={(dataUrl) => console.log(dataUrl)} />
 * ```
 */
function ScreenCapture({
  onCapture,
  className,
  toolbar = true,
}: ScreenCaptureProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const overlayRef = React.useRef<HTMLCanvasElement>(null);
  const streamRef = React.useRef<MediaStream | null>(null);

  const [isSharing, setIsSharing] = React.useState(false);
  const [isSupported, setIsSupported] = React.useState(true);
  const [hasCapture, setHasCapture] = React.useState(false);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [drawStart, setDrawStart] = React.useState<{
    x: number;
    y: number;
  } | null>(null);
  const [annotations, setAnnotations] = React.useState<AnnotationRect[]>([]);

  React.useEffect(() => {
    if (
      typeof navigator === "undefined" ||
      !navigator.mediaDevices?.getDisplayMedia
    ) {
      setIsSupported(false);
    }
  }, []);

  const cleanup = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setIsSharing(false);
  };

  React.useEffect(() => {
    return cleanup;
  }, []);

  const startShare = async () => {
    if (!isSupported) return;
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsSharing(true);

      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.onended = () => {
          cleanup();
        };
      }
    } catch {
      setIsSharing(false);
    }
  };

  const capture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !video.videoWidth) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);
    setHasCapture(true);

    // Resize overlay to match
    const overlay = overlayRef.current;
    if (overlay) {
      overlay.width = video.videoWidth;
      overlay.height = video.videoHeight;
      redrawAnnotations();
    }
  };

  const redrawAnnotations = () => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const ctx = overlay.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, overlay.width, overlay.height);
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 3;
    for (const rect of annotations) {
      ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
    }
  };

  const handleOverlayMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!hasCapture) return;
    const overlay = overlayRef.current;
    if (!overlay) return;
    const rect = overlay.getBoundingClientRect();
    const scaleX = overlay.width / rect.width;
    const scaleY = overlay.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    setIsDrawing(true);
    setDrawStart({ x, y });
  };

  const handleOverlayMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !drawStart) return;
    const overlay = overlayRef.current;
    if (!overlay) return;
    const ctx = overlay.getContext("2d");
    if (!ctx) return;
    const rect = overlay.getBoundingClientRect();
    const scaleX = overlay.width / rect.width;
    const scaleY = overlay.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    redrawAnnotations();
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 3;
    ctx.strokeRect(drawStart.x, drawStart.y, x - drawStart.x, y - drawStart.y);
  };

  const handleOverlayMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !drawStart) return;
    const overlay = overlayRef.current;
    if (!overlay) return;
    const rect = overlay.getBoundingClientRect();
    const scaleX = overlay.width / rect.width;
    const scaleY = overlay.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const newRect: AnnotationRect = {
      x: Math.min(drawStart.x, x),
      y: Math.min(drawStart.y, y),
      w: Math.abs(x - drawStart.x),
      h: Math.abs(y - drawStart.y),
    };
    setAnnotations((prev) => [...prev, newRect]);
    setIsDrawing(false);
    setDrawStart(null);
  };

  const clearAnnotations = () => {
    setAnnotations([]);
    const overlay = overlayRef.current;
    if (overlay) {
      const ctx = overlay.getContext("2d");
      ctx?.clearRect(0, 0, overlay.width, overlay.height);
    }
  };

  const download = () => {
    const canvas = canvasRef.current;
    const overlay = overlayRef.current;
    if (!canvas) return;

    // Merge annotations into canvas for download
    if (overlay) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(overlay, 0, 0);
      }
    }

    const dataUrl = canvas.toDataURL("image/png");
    onCapture?.(dataUrl);

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `screenshot-${Date.now()}.png`;
    link.click();
  };

  if (!isSupported) {
    return (
      <div
        data-slot="screen-capture"
        className={cn(
          "bg-muted/50 text-muted-foreground flex items-center justify-center rounded-lg border border-dashed p-8 text-sm",
          className,
        )}
      >
        <MonitorIcon className="mr-2 size-5" />
        当前浏览器不支持屏幕捕获功能
      </div>
    );
  }

  return (
    <div
      data-slot="screen-capture"
      className={cn("flex flex-col gap-3", className)}
    >
      {/* Video preview / Canvas display */}
      <div className="relative overflow-hidden rounded-lg border bg-black">
        <video
          ref={videoRef}
          className={cn(
            "w-full",
            !isSharing && "hidden",
            hasCapture && "hidden",
          )}
          playsInline
          muted
        />
        {hasCapture && (
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={canvasRef.current?.toDataURL("image/png") ?? ""}
              alt="capture"
              className="w-full"
            />
            <canvas
              ref={overlayRef}
              className="absolute inset-0 h-full w-full cursor-crosshair"
              onMouseDown={handleOverlayMouseDown}
              onMouseMove={handleOverlayMouseMove}
              onMouseUp={handleOverlayMouseUp}
            />
          </div>
        )}
        {!isSharing && !hasCapture && (
          <div className="text-muted-foreground flex h-48 items-center justify-center text-sm">
            <MonitorIcon className="mr-2 size-5" />
            点击下方按钮开始屏幕共享
          </div>
        )}
      </div>

      {/* Hidden canvas for capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Toolbar */}
      {toolbar && (
        <div className="flex flex-wrap items-center gap-2">
          {!isSharing && !hasCapture && (
            <Button onClick={startShare} size="sm" className="gap-1.5">
              <MonitorIcon className="size-4" />
              开始共享
            </Button>
          )}
          {isSharing && !hasCapture && (
            <Button onClick={capture} size="sm" className="gap-1.5">
              <CameraIcon className="size-4" />
              截图
            </Button>
          )}
          {hasCapture && (
            <>
              <Button
                onClick={clearAnnotations}
                variant="outline"
                size="sm"
                className="gap-1.5"
              >
                <Trash2Icon className="size-4" />
                清除标注
              </Button>
              <Button onClick={download} size="sm" className="gap-1.5">
                <DownloadIcon className="size-4" />
                下载
              </Button>
              <Button
                onClick={() => {
                  setHasCapture(false);
                  setAnnotations([]);
                }}
                variant="outline"
                size="sm"
              >
                重新开始
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export { ScreenCapture };
export type { ScreenCaptureProps };
