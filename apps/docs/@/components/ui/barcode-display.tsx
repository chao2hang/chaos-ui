"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component BarcodeDisplay
 * @category ui/display
 * @since 0.7.0
 * @description 条形码展示组件 — 使用纯 CSS/SVG 生成 Code128 风格的条形码。
 * 轻量实现，无需外部依赖。对于生产场景建议接入 JsBarcode 库。
 * / Barcode display — lightweight CSS/SVG renderer, no external deps.
 * @keywords barcode, scan, display, code128
 * @example
 * <BarcodeDisplay value="1234567890" height={48} />
 */
interface BarcodeDisplayProps extends React.ComponentProps<"div"> {
  /** Barcode value / 条形码值 */
  value: string;
  /** Bar height in px / 条形高度 */
  height?: number;
  /** Show the value text below bars / 是否显示值文本 */
  showText?: boolean;
  /** Bar width unit in px (1-4) / 条宽单位 */
  barWidth?: number;
}

/** Deterministic bar pattern generator from string */
function generateBars(value: string): number[] {
  const bars: number[] = [];
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);
    // Start bar + variable width bars based on char code
    bars.push(2 + (code % 3)); // narrow/medium/wide
    bars.push(1 + ((code >> 2) % 2));
  }
  // Add start/stop markers
  return [2, 1, ...bars, 2, 1];
}

function BarcodeDisplay({
  value,
  height = 48,
  showText = true,
  barWidth = 2,
  className,
  ...props
}: BarcodeDisplayProps) {
  const bars = React.useMemo(() => generateBars(value), [value]);

  return (
    <div
      data-slot="barcode-display"
      className={cn("inline-flex flex-col items-center gap-1", className)}
      {...props}
    >
      <div
        className="flex items-end"
        style={{ height }}
        role="img"
        aria-label={`Barcode: ${value}`}
      >
        {bars.map((width, i) => (
          <div
            key={i}
            className={i % 2 === 0 ? "bg-foreground" : "bg-transparent"}
            style={{ width: width * barWidth, height: "100%" }}
          />
        ))}
      </div>
      {showText && (
        <span className="text-muted-foreground font-mono text-xs tracking-wider">
          {value}
        </span>
      )}
    </div>
  );
}

export { BarcodeDisplay };
export type { BarcodeDisplayProps };
