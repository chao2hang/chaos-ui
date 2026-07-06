"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const watermarkVariants = cva("pointer-events-none select-none", {
  variants: {
    size: {
      default: "text-sm",
      sm: "text-xs",
      lg: "text-base",
    },
  },
  defaultVariants: { size: "default" },
});

interface WatermarkProps
  extends React.ComponentProps<"div">, VariantProps<typeof watermarkVariants> {
  /** Text content for the watermark */
  content: string;
  /** Rotation angle in degrees */
  rotate?: number;
  /** Gap between repeated marks */
  gap?: number;
  /** Opacity of the watermark */
  opacity?: number;
  /** Text color */
  color?: string;
  /** Font size override */
  fontSize?: number;
}

function Watermark({
  className,
  size,
  content,
  rotate = -22,
  gap = 100,
  opacity = 0.1,
  color = "#000",
  fontSize = 14,
  children,
  ...props
}: WatermarkProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = color.startsWith("#")
      ? `${color}${Math.round(opacity * 255)
          .toString(16)
          .padStart(2, "0")}`
      : color;
    ctx.font = `${fontSize}px system-ui, sans-serif`;

    const textWidth = ctx.measureText(content).width;

    const rad = (rotate * Math.PI) / 180;
    const diagonal = Math.sqrt(width * width + height * height);

    for (let x = -diagonal; x < diagonal * 2; x += gap + textWidth) {
      for (let y = -diagonal; y < diagonal * 2; y += gap + fontSize * 2) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rad);
        ctx.fillText(content, 0, 0);
        ctx.restore();
      }
    }
  }, [content, rotate, gap, opacity, color, fontSize]);

  return (
    <div
      ref={containerRef}
      data-slot="watermark"
      className={cn("relative", watermarkVariants({ size }), className)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}

export { Watermark, watermarkVariants };
