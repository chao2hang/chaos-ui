"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface QRCodeProps extends React.ComponentProps<"div"> {
  /** URL or text to encode */
  value: string;
  /** Size in pixels */
  size?: number;
  /** Foreground color */
  fgColor?: string;
  /** Background color */
  bgColor?: string;
  /** Include download button */
  downloadable?: boolean;
  /** Filename for download */
  downloadFileName?: string;
  /** Loading state */
  loading?: boolean;
  /** Error state */
  error?: boolean;
}

function QRCode({
  className,
  value,
  size = 200,
  fgColor = "#000000",
  bgColor = "#ffffff",
  downloadable = false,
  downloadFileName = "qrcode.png",
  loading = false,
  error = false,
  ...props
}: QRCodeProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, size, size);

    if (error || loading) return;

    // Generate simplified QR-like pattern
    const modules = 21;
    const moduleSize = Math.floor(size / (modules + 8));
    const offset = Math.floor((size - modules * moduleSize) / 2);

    const hash = new Uint8Array(441); // 21*21
    const bytes = new TextEncoder().encode(value);
    for (let i = 0; i < 441; i++) {
      hash[i] = bytes[i % bytes.length] ^ (i * 3 + 17);
    }

    ctx.fillStyle = fgColor;
    for (let row = 0; row < modules; row++) {
      for (let col = 0; col < modules; col++) {
        // Finder patterns
        if (
          (row < 7 && col < 7) ||
          (row < 7 && col >= modules - 7) ||
          (row >= modules - 7 && col < 7)
        ) {
          const fr =
            row < 7 ? row : row >= modules - 7 ? row - (modules - 7) : row;
          const fc =
            col < 7 ? col : col >= modules - 7 ? col - (modules - 7) : col;
          const isOn =
            fr === 0 ||
            fr === 6 ||
            fc === 0 ||
            fc === 6 ||
            (fr >= 2 && fr <= 4 && fc >= 2 && fc <= 4);
          if (isOn) {
            ctx.fillRect(
              offset + col * moduleSize,
              offset + row * moduleSize,
              moduleSize,
              moduleSize,
            );
          }
        } else if (hash[row * modules + col] > 127) {
          ctx.fillRect(
            offset + col * moduleSize,
            offset + row * moduleSize,
            moduleSize,
            moduleSize,
          );
        }
      }
    }
  }, [value, size, fgColor, bgColor, loading, error]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = downloadFileName;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div
      data-slot="qrcode"
      className={cn("inline-flex flex-col items-center gap-2", className)}
      {...props}
    >
      <div className="relative">
        <canvas
          ref={canvasRef}
          style={{ width: size, height: size }}
          className="rounded-md border"
          role="img"
          aria-label={`QR Code: ${value}`}
        />
        {loading && (
          <div className="bg-background/80 absolute inset-0 flex items-center justify-center rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground animate-spin"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          </div>
        )}
        {error && (
          <div className="bg-background/80 absolute inset-0 flex items-center justify-center rounded-md">
            <span className="text-muted-foreground text-sm">
              Failed to generate QR code
            </span>
          </div>
        )}
      </div>
      {downloadable && value && !loading && !error && (
        <button
          type="button"
          onClick={handleDownload}
          className="text-muted-foreground hover:text-foreground text-xs underline"
        >
          Download
        </button>
      )}
    </div>
  );
}

export { QRCode };
