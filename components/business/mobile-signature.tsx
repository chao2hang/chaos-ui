"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { SignatureIcon, Trash2Icon } from "@/components/ui/icons";

/**
 * @component MobileSignature
 * @category business/mobile
 * @since 0.7.0
 * @description 移动端签名板 — 基于触摸/鼠标绘制的签名画布，可清除并保存为 PNG Blob。
 * @keywords mobile, signature
 * @param onSave 保存回调，参数为画布导出的 PNG Blob。
 * @example
 * <MobileSignature onSave={(blob) => upload(blob)} />
 */

interface MobileSignatureProps {
  onSave?: (blob: Blob) => void;
  className?: string;
}

function getPoint(event: React.PointerEvent<HTMLCanvasElement>, canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * canvas.width,
    y: ((event.clientY - rect.top) / rect.height) * canvas.height,
  };
}

function MobileSignature({ onSave, className }: MobileSignatureProps) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const drawingRef = React.useRef(false);
  const lastRef = React.useRef<{ x: number; y: number } | null>(null);
  const [hasInk, setHasInk] = React.useState(false);

  const ensureSize = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const rect = canvas.getBoundingClientRect();
    const targetW = Math.max(1, Math.round(rect.width * dpr));
    const targetH = Math.max(1, Math.round(rect.height * dpr));
    if (canvas.width !== targetW || canvas.height !== targetH) {
      // Preserve existing ink across resizes.
      const tmp = document.createElement("canvas");
      tmp.width = canvas.width;
      tmp.height = canvas.height;
      const tmpCtx = tmp.getContext("2d");
      if (tmpCtx) tmpCtx.drawImage(canvas, 0, 0);
      canvas.width = targetW;
      canvas.height = targetH;
      ctx.drawImage(tmp, 0, 0, canvas.width, canvas.height);
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.lineWidth = 2 * dpr;
      ctx.strokeStyle = "currentColor";
    }
  }, []);

  React.useEffect(() => {
    ensureSize();
  }, [ensureSize]);

  const stroke = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  };

  const onPointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(event.pointerId);
    drawingRef.current = true;
    lastRef.current = getPoint(event, canvas);
    setHasInk(true);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !drawingRef.current || !lastRef.current) return;
    const point = getPoint(event, canvas);
    stroke(lastRef.current, point);
    lastRef.current = point;
  };

  const onPointerUp = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      try {
        canvas.releasePointerCapture(event.pointerId);
      } catch {
        /* pointer may already be released */
      }
    }
    drawingRef.current = false;
    lastRef.current = null;
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasInk(false);
  };

  const save = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasInk) return;
    canvas.toBlob((blob) => {
      if (blob) onSave?.(blob);
    }, "image/png");
  };

  return (
    <div
      data-slot="mobile-signature"
      className={cn("flex flex-col gap-2 text-foreground", className)}
    >
      <div className="relative h-40 w-full overflow-hidden rounded-lg border bg-background">
        <canvas
          ref={canvasRef}
          data-slot="mobile-signature-canvas"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="h-full w-full touch-none"
          role="img"
          aria-label="签名画板"
        />
        {!hasInk ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <SignatureIcon className="size-5" aria-hidden="true" />
            <span>请在此处签名</span>
          </div>
        ) : null}
        <div className="pointer-events-none absolute inset-x-0 bottom-3 border-b border-dashed border-border" aria-hidden="true" />
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={clear}
          className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm hover:bg-muted"
        >
          <Trash2Icon className="size-4" aria-hidden="true" />
          清除
        </button>
        <button
          type="button"
          onClick={save}
          disabled={!hasInk}
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          <SignatureIcon className="size-4" aria-hidden="true" />
          保存
        </button>
      </div>
    </div>
  );
}

export { MobileSignature };
export type { MobileSignatureProps };
