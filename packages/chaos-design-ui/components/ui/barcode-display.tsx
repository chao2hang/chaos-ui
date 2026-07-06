"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface BarcodeDisplayProps extends React.ComponentProps<"div"> {
  /** Text value to encode */
  value: string;
  /** Barcode width in pixels */
  width?: number;
  /** Barcode height in pixels */
  height?: number;
  /** Background color */
  background?: string;
  /** Bar color */
  color?: string;
}

function BarcodeDisplay({
  className,
  value,
  width = 200,
  height = 80,
  background = "#ffffff",
  color = "#000000",
  ...props
}: BarcodeDisplayProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Simple code-128-like barcode rendering
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);

    const chars = value.split("");
    const barWidth = Math.max(
      1,
      Math.floor((width - 20) / (chars.length * 11)),
    );

    let x = 10;
    ctx.fillStyle = color;

    // Start guard
    ctx.fillRect(x, 10, barWidth, height - 20);
    x += barWidth * 2;
    ctx.fillRect(x, 10, barWidth, height - 20);
    x += barWidth * 2;

    for (const char of chars) {
      const code = char.charCodeAt(0);
      for (let i = 6; i >= 0; i--) {
        const bit = (code >> i) & 1;
        if (bit) {
          ctx.fillRect(x, 10, barWidth, height - 20);
        }
        x += barWidth;
      }
      x += barWidth; // gap between chars
    }

    // End guard
    ctx.fillRect(x, 10, barWidth * 2, height - 20);
    x += barWidth * 2;
    ctx.fillRect(x, 10, barWidth, height - 20);

    // Text label
    ctx.fillStyle = color;
    ctx.font = `${Math.max(10, height * 0.15)}px monospace`;
    ctx.textAlign = "center";
    ctx.fillText(value, width / 2, height - 2);
  }, [value, width, height, background, color]);

  return (
    <div
      data-slot="barcode-display"
      className={cn("inline-block", className)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        style={{ width, height }}
        role="img"
        aria-label={`Barcode: ${value}`}
      />
    </div>
  );
}

export { BarcodeDisplay };
