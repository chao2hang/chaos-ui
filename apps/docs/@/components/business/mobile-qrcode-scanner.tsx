"use client";
import * as React from "react";

import { cn } from "@chaos_team/chaos-ui/lib";
import { QrCodeIcon } from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component MobileQrCodeScanner
 * @category business/mobile
 * @since 0.7.0
 * @description 移动端二维码扫描 — 调用摄像头并通过 BarcodeDetector 解码；不支持时提供手动输入兜底。
 * @keywords mobile, qrcode, scanner
 * @param onScan 扫描成功回调，参数为解码出的字符串。
 * @example
 * <MobileQrCodeScanner onScan={(code) => navigate(code)} />
 */

interface MobileQrCodeScannerProps {
  onScan?: (result: string) => void;
  className?: string;
}

type ScanStatus = "idle" | "starting" | "scanning" | "denied" | "unsupported";

declare global {
  interface Window {
    BarcodeDetector?: new (options?: { formats?: string[] }) => {
      detect: (
        source: CanvasImageSource,
      ) => Promise<Array<{ rawValue?: string }>>;
    };
  }
}

function MobileQrCodeScanner({ onScan, className }: MobileQrCodeScannerProps) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const streamRef = React.useRef<MediaStream | null>(null);
  const rafRef = React.useRef<number | null>(null);
  const [status, setStatus] = React.useState<ScanStatus>("idle");
  const [manual, setManual] = React.useState("");

  const stop = React.useCallback(() => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  const start = React.useCallback(async () => {
    const supported =
      typeof navigator !== "undefined" &&
      !!navigator.mediaDevices?.getUserMedia &&
      typeof window !== "undefined" &&
      typeof window.BarcodeDetector === "function";
    if (!supported) {
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
      setStatus("scanning");
    } catch {
      setStatus("denied");
    }
  }, []);

  React.useEffect(() => {
    start();
    return stop;
  }, [start, stop]);

  React.useEffect(() => {
    if (status !== "scanning") return;
    const detector = new window.BarcodeDetector!({ formats: ["qr_code"] });
    const canvas = document.createElement("canvas");
    const tick = async () => {
      const video = videoRef.current;
      if (!video || video.readyState < 2) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      try {
        const codes = await detector.detect(video);
        const first = codes[0];
        if (first && first.rawValue) {
          onScan?.(first.rawValue);
          return;
        }
      } catch {
        /* ignore single-frame decode errors */
      }
      rafRef.current = requestAnimationFrame(tick);
      void canvas;
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [status, onScan]);

  const submitManual = () => {
    const value = manual.trim();
    if (value) onScan?.(value);
  };

  return (
    <div
      data-slot="mobile-qrcode-scanner"
      className={cn(
        "relative flex flex-col overflow-hidden rounded-lg bg-black",
        className,
      )}
    >
      <div className="relative aspect-square w-full bg-black">
        <video
          ref={videoRef}
          playsInline
          muted
          className="h-full w-full object-cover"
          data-slot="mobile-qrcode-scanner-video"
        />
        {/* Scan frame overlay */}
        {status === "scanning" ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="size-2/3 rounded-lg border-2 border-white/80 shadow-[0_0_0_9999px_rgba(0,0,0,0.4)]" />
          </div>
        ) : null}
        {status !== "scanning" ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center text-sm text-white/80">
            <QrCodeIcon className="size-8" aria-hidden="true" />
            <span>
              {status === "starting"
                ? "正在启动扫描…"
                : status === "denied"
                  ? "摄像头访问被拒绝"
                  : status === "unsupported"
                    ? "当前环境不支持扫码，请手动输入"
                    : "点击下方按钮开启扫描"}
            </span>
          </div>
        ) : null}
      </div>
      <div className="flex flex-col gap-2 bg-black/80 p-3">
        {status !== "scanning" ? (
          <button
            type="button"
            onClick={start}
            className="self-center rounded-full bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20"
          >
            重新扫描
          </button>
        ) : null}
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            submitManual();
          }}
        >
          <label className="sr-only" htmlFor="qr-manual-input">
            手动输入二维码内容
          </label>
          <input
            id="qr-manual-input"
            type="text"
            value={manual}
            onChange={(e) => setManual(e.target.value)}
            placeholder="手动输入二维码内容"
            className="min-w-0 flex-1 rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40"
          />
          <button
            type="submit"
            className="shrink-0 rounded-md bg-white px-3 py-2 text-sm font-medium text-black"
          >
            确认
          </button>
        </form>
      </div>
    </div>
  );
}

export { MobileQrCodeScanner };
export { MobileQrCodeScanner as MobileQrCodeScanner };
export type { MobileQrCodeScannerProps };
