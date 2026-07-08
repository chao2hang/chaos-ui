"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component QrCodeDisplay
 * @category ui/display
 * @since 0.7.0
 * @description 二维码展示组件 — 使用纯 CSS 矩阵生成二维码风格的图形。
 * 轻量实现，对于生产场景建议接入 qrcode.react 库。
 * / QR code display — lightweight CSS matrix renderer, no external deps.
 * @keywords qrcode, qr, display, scan
 * @example
 * <QrCodeDisplay value="https://example.com" size={128} />
 */
interface QrCodeDisplayProps extends React.ComponentProps<"div"> {
  /** QR code value / 二维码内容 */
  value: string;
  /** Size in px / 尺寸 */
  size?: number;
  /** Show the value text below / 是否显示值文本 */
  showText?: boolean;
}

/** Deterministic matrix generator from string (simulated QR pattern) */
function generateMatrix(value: string, modules = 21): boolean[][] {
  const matrix: boolean[][] = [];
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = ((hash << 5) - hash + value.charCodeAt(i)) | 0;
  }
  for (let r = 0; r < modules; r++) {
    const row: boolean[] = [];
    for (let c = 0; c < modules; c++) {
      // Finder patterns (3 corners)
      const inFinder =
        (r < 7 && c < 7) ||
        (r < 7 && c >= modules - 7) ||
        (r >= modules - 7 && c < 7);
      if (inFinder) {
        const lr = r < 7 ? r : r - (modules - 7);
        const lc = c < 7 ? c : c - (modules - 7);
        const onBorder = lr === 0 || lr === 6 || lc === 0 || lc === 6;
        const inCenter = lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4;
        row.push(onBorder || inCenter);
      } else {
        hash = (hash * 1103515245 + 12345) & 0x7fffffff;
        row.push((hash >> 16) % 100 < 45);
      }
    }
    matrix.push(row);
  }
  return matrix;
}

function QrCodeDisplay({
  value,
  size = 128,
  showText = false,
  className,
  ...props
}: QrCodeDisplayProps) {
  const modules = 21;
  const matrix = React.useMemo(() => generateMatrix(value, modules), [value]);
  const cellSize = size / modules;

  return (
    <div
      data-slot="qrcode-display"
      className={cn("inline-flex flex-col items-center gap-1", className)}
      {...props}
    >
      <div
        className="relative bg-white"
        style={{ width: size, height: size }}
        role="img"
        aria-label={`QR code: ${value}`}
      >
        {matrix.map((row, r) =>
          row.map((on, c) =>
            on ? (
              <div
                key={`${r}-${c}`}
                className="absolute bg-black"
                style={{
                  left: c * cellSize,
                  top: r * cellSize,
                  width: cellSize,
                  height: cellSize,
                }}
              />
            ) : null,
          ),
        )}
      </div>
      {showText && (
        <span className="text-muted-foreground font-mono text-xs">{value}</span>
      )}
    </div>
  );
}

export { QrCodeDisplay };
export { QrCodeDisplay as QRCodeDisplay };
export type { QrCodeDisplayProps };
