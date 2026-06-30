"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component SplitScreen
 * @category Layout
 * @since 1.0.0-beta.0
 * @description 左右（或上下）分屏布局 — 两个等宽 flex-1 面板与分隔线。
 * @param left 左（或上）面板内容。
 * @param right 右（或下）面板内容。
 * @param direction 排列方向，默认 `horizontal`。
 * @param className 根元素附加类名。
 * @example
 * ```tsx
 * <SplitScreen left={<MasterList />} right={<DetailPane />} />
 * ```
 */
export interface SplitScreenProps {
  /** Left (or top) pane content. */
  left?: React.ReactNode;
  /** Right (or bottom) pane content. */
  right?: React.ReactNode;
  /** Layout direction. Defaults to `horizontal`. */
  direction?: "horizontal" | "vertical";
  className?: string;
}

function SplitScreen({
  left,
  right,
  direction = "horizontal",
  className,
}: SplitScreenProps) {
  const isVertical = direction === "vertical";
  return (
    <div
      data-slot="split-screen"
      className={cn(
        "flex w-full",
        isVertical ? "flex-col" : "flex-row",
        className,
      )}
    >
      <section
        aria-label="左面板"
        className={cn(
          "min-w-0 flex-1",
          isVertical ? "min-h-0 overflow-auto" : "overflow-auto",
        )}
      >
        {left}
      </section>
      <div
        role="separator"
        aria-orientation={isVertical ? "horizontal" : "vertical"}
        className={cn(
          "shrink-0 bg-border",
          isVertical ? "h-px w-full" : "h-full w-px",
        )}
      />
      <section
        aria-label="右面板"
        className={cn(
          "min-w-0 flex-1",
          isVertical ? "min-h-0 overflow-auto" : "overflow-auto",
        )}
      >
        {right}
      </section>
    </div>
  );
}

export { SplitScreen };
