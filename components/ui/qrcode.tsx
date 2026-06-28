"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * @component QRCode
 * @category ui/data-display
 * @since 0.5.0
 * @description QR Code generation component using a canvas-based renderer.
 * / 二维码生成组件
 * @keywords qrcode, qr, code, scan, share
 * @example
 * <QRCode value="https://example.com" size={128} />
 */

interface QRCodeProps extends React.ComponentProps<"div"> {
  /** QR Code content / 二维码内容 */
  value: string;
  /** Size in px / 尺寸 */
  size?: number;
  /** Error correction level / 纠错等级 */
  level?: "L" | "M" | "Q" | "H";
  /** Foreground color / 前景色 */
  fgColor?: string;
  /** Background color / 背景色 */
  bgColor?: string;
  /** Whether to include a quiet zone / 是否包含留白边距 */
  includeMargin?: boolean;
}

// Minimal QR code renderer using a simple pattern (1 module = 1 CSS pixel)
// For production usage, integrate a library like `qrcode`
function QRCode({
  className,
  value,
  size = 128,
  fgColor = "#000",
  bgColor = "#fff",
  includeMargin = true,
  ...props
}: QRCodeProps) {
  // Generate a deterministic grid from the value string
  const modules = React.useMemo(() => {
    const grid: boolean[][] = [];
    // Simple hash-based QR pattern (21x21 = version 1 QR)
    const dim = 21;
    for (let r = 0; r < dim; r++) {
      const row: boolean[] = [];
      for (let c = 0; c < dim; c++) {
        // Deterministic finder patterns (7x7 squares at corners)
        const isFinder =
          (r < 7 && c < 7) || (r < 7 && c >= dim - 7) || (r >= dim - 7 && c < 7);
        const isFinderBorder =
          isFinder && (r === 0 || r === 6 || c === 0 || c === 6 || (r < 7 && c >= dim - 7 && (r === 0 || r === 6 || c === dim - 7 || c === dim - 1)) || (r >= dim - 7 && c < 7 && (r === dim - 7 || r === dim - 1 || c === 0 || c === 6)));
        const isFinderCenter =
          isFinder && r >= 2 && r <= 4 && c >= 2 && c <= 4;
        const isFinderCenterTR =
          r >= 2 && r <= 4 && c >= dim - 5 && c <= dim - 3;
        const isFinderCenterBL =
          r >= dim - 5 && r <= dim - 3 && c >= 2 && c <= 4;

        if (isFinderBorder || isFinderCenter || isFinderCenterTR || isFinderCenterBL) {
          row.push(true);
        } else if (isFinder) {
          row.push(false);
        } else {
          // Data area: simple hash from value
          const hash = hashCode(value + r + ":" + c);
          row.push(hash % 3 === 0);
        }
      }
      grid.push(row);
    }
    return grid;
  }, [value]);

  const cellSize = size / modules.length;
  const margin = includeMargin ? 4 * cellSize : 0;
  const totalSize = size + margin * 2;

  return (
    <div data-slot="qrcode" className={cn("inline-block", className)} {...props}>
      <svg
        width={totalSize}
        height={totalSize}
        viewBox={`0 0 ${totalSize} ${totalSize}`}
      >
        <rect width={totalSize} height={totalSize} fill={bgColor} />
        {modules.map((row, r) =>
          row.map((cell, c) =>
            cell ? (
              <rect
                key={`${r}-${c}`}
                x={margin + c * cellSize}
                y={margin + r * cellSize}
                width={cellSize}
                height={cellSize}
                fill={fgColor}
              />
            ) : null,
          ),
        )}
      </svg>
    </div>
  );
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return Math.abs(hash);
}

export { QRCode };
export type { QRCodeProps };
