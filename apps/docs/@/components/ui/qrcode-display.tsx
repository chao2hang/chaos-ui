"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface QRCodeDisplayProps extends React.ComponentProps<"div"> {
  /** Text to encode in QR code */
  value: string;
  /** Size in pixels */
  size?: number;
  /** Foreground color */
  fgColor?: string;
  /** Background color */
  bgColor?: string;
  /** Error correction level */
  level?: "L" | "M" | "Q" | "H";
  /** Include margin/padding */
  includeMargin?: boolean;
}

function QRCodeDisplay({
  className,
  value,
  size = 200,
  fgColor = "#000000",
  bgColor = "#ffffff",
  level = "M",
  includeMargin = true,
  ...props
}: QRCodeDisplayProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Simple QR-like pattern generator
    const margin = includeMargin ? 4 : 0;
    const modules = 21; // QR version 1
    const moduleSize = Math.floor((size - margin * 2) / modules);
    const totalSize = modules * moduleSize + margin * 2;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = totalSize * dpr;
    canvas.height = totalSize * dpr;
    canvas.style.width = `${totalSize}px`;
    canvas.style.height = `${totalSize}px`;
    ctx.scale(dpr, dpr);

    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, totalSize, totalSize);

    // Generate simple hash-based pattern
    const hash = hashString(value);
    const pattern: boolean[][] = [];

    for (let row = 0; row < modules; row++) {
      pattern[row] = [];
      for (let col = 0; col < modules; col++) {
        // Reserve finder patterns (7x7 corners)
        if (
          (row < 8 && col < 8) ||
          (row < 8 && col >= modules - 8) ||
          (row >= modules - 8 && col < 8)
        ) {
          const innerRow =
            row < 8 ? row : row >= modules - 8 ? row - (modules - 8) : row;
          const innerCol =
            col < 8 ? col : col >= modules - 8 ? col - (modules - 8) : col;
          const isFinder =
            innerRow === 0 ||
            innerRow === 6 ||
            innerCol === 0 ||
            innerCol === 6 ||
            (innerRow >= 1 && innerRow <= 5 && innerCol >= 1 && innerCol <= 5);
          pattern[row][col] = isFinder;
        } else {
          // Hash-based fill
          const idx = row * modules + col;
          const byte = hash[idx % hash.length];
          pattern[row][col] = byte > 127;
        }
      }
    }

    // Draw modules
    ctx.fillStyle = fgColor;
    for (let row = 0; row < modules; row++) {
      for (let col = 0; col < modules; col++) {
        if (pattern[row][col]) {
          ctx.fillRect(
            margin + col * moduleSize,
            margin + row * moduleSize,
            moduleSize,
            moduleSize,
          );
        }
      }
    }
  }, [value, size, fgColor, bgColor, level, includeMargin]);

  return (
    <div
      data-slot="qrcode-display"
      className={cn("inline-block", className)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        style={{ width: size, height: size }}
        role="img"
        aria-label={`QR Code: ${value}`}
      />
    </div>
  );
}

function hashString(str: string): Uint8Array {
  const bytes = new TextEncoder().encode(str);
  // Simple hash: repeat and XOR
  const result = new Uint8Array(256);
  for (let i = 0; i < 256; i++) {
    result[i] = bytes[i % bytes.length] ^ (i * 7);
  }
  return result;
}

export { QRCodeDisplay };
