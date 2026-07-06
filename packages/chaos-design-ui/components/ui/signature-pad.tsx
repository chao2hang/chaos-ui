"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const signaturePadVariants = cva(
  "relative overflow-hidden rounded-md border border-input bg-background",
  {
    variants: {
      size: {
        default: "h-40 w-full",
        sm: "h-32 w-full",
        lg: "h-56 w-full",
      },
    },
    defaultVariants: { size: "default" },
  },
);

interface SignaturePadProps
  extends
    React.ComponentProps<"div">,
    VariantProps<typeof signaturePadVariants> {
  /** Called when signature data URL changes */
  onSave?: (dataUrl: string) => void;
  /** Pen color */
  penColor?: string;
  /** Pen width */
  penWidth?: number;
  /** Background color */
  backgroundColor?: string;
  /** Whether the pad is read-only */
  readOnly?: boolean;
  /** Clear signature */
  onClear?: () => void;
}

function SignaturePad({
  className,
  size,
  onSave,
  penColor = "#000000",
  penWidth = 2,
  backgroundColor = "#ffffff",
  readOnly = false,
  onClear,
  ...props
}: SignaturePadProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const isDrawing = React.useRef(false);
  const lastPoint = React.useRef<{ x: number; y: number } | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(dpr, dpr);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, [backgroundColor, penColor, penWidth]);

  const getPos = (
    e: React.MouseEvent | React.TouchEvent,
  ): { x: number; y: number } => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ("touches" in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (readOnly) return;
    isDrawing.current = true;
    const pos = getPos(e);
    lastPoint.current = pos;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.arc(pos.x, pos.y, penWidth / 2, 0, Math.PI * 2);
    ctx.fillStyle = penColor;
    ctx.fill();
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current || readOnly) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pos = getPos(e);
    if (lastPoint.current) {
      ctx.beginPath();
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
    lastPoint.current = pos;
  };

  const stopDrawing = () => {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    lastPoint.current = null;

    const canvas = canvasRef.current;
    if (canvas) {
      onSave?.(canvas.toDataURL("image/png"));
    }
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, rect.width, rect.height);
    onSave?.("");
    onClear?.();
  };

  return (
    <div
      data-slot="signature-pad"
      className={cn(signaturePadVariants({ size }), className)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="size-full touch-none"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        role="img"
        aria-label="Signature pad"
      />
      {!readOnly && (
        <button
          type="button"
          onClick={handleClear}
          className="bg-background/80 text-muted-foreground hover:text-foreground absolute top-2 right-2 rounded px-2 py-1 text-xs"
        >
          Clear
        </button>
      )}
    </div>
  );
}

export { SignaturePad, signaturePadVariants };
