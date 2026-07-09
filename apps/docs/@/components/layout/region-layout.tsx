"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface RegionLayoutProps {
  /** Top region (header) */
  top?: React.ReactNode;
  /** Left panel */
  left?: React.ReactNode;
  /** Main content area */
  main: React.ReactNode;
  /** Right panel */
  right?: React.ReactNode;
  /** Bottom region (footer) */
  bottom?: React.ReactNode;
  /** Left panel width */
  leftWidth?: number | string;
  /** Right panel width */
  rightWidth?: number | string;
  /** Resizable left panel */
  resizableLeft?: boolean;
  /** Resizable right panel */
  resizableRight?: boolean;
  /** Gutters */
  gap?: number;
  className?: string;
}

/**
 * 多区域布局 —— 对标 qxy-mop 旧系统 region-layout 面板。
 * 支持 top/left/main/right/bottom 五区域灵活组合。
 *
 * @component RegionLayout
 * @category layout/business
 * @since 0.2.0
 */
function RegionLayout({
  top,
  left,
  main,
  right,
  bottom,
  leftWidth = 260,
  rightWidth = 320,
  resizableLeft = false,
  resizableRight = false,
  gap = 0,
  className,
}: RegionLayoutProps) {
  return (
    <div
      data-slot="region-layout"
      className={cn("flex h-full flex-col", className)}
    >
      {/* Top */}
      {top && <div className="shrink-0">{top}</div>}

      {/* Middle: left + main + right */}
      <div className="flex flex-1 overflow-hidden" style={{ gap }}>
        {/* Left */}
        {left && (
          <aside
            className="shrink-0 overflow-auto border-r"
            style={{
              width: leftWidth,
              resize: resizableLeft ? "horizontal" : undefined,
            }}
          >
            {left}
          </aside>
        )}

        {/* Main */}
        <main className="flex-1 overflow-auto">{main}</main>

        {/* Right */}
        {right && (
          <aside
            className="shrink-0 overflow-auto border-l"
            style={{
              width: rightWidth,
              resize: resizableRight ? "horizontal" : undefined,
            }}
          >
            {right}
          </aside>
        )}
      </div>

      {/* Bottom */}
      {bottom && <div className="shrink-0 border-t">{bottom}</div>}
    </div>
  );
}

export { RegionLayout };
export type { RegionLayoutProps };
