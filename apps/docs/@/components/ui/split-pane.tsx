"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SplitPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "horizontal" | "vertical";
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  onResize?: (size: number) => void;
  first: React.ReactNode;
  second: React.ReactNode;
  resizer?: boolean;
}

/**
 * @component SplitPane
 * @category ui/layout
 * @since 0.2.0
 * @description Resizable split view with a draggable divider between two panes / 可调整大小的分割视图，两个面板之间带有可拖动的分隔条
 * @keywords split, pane, resizable, divider, layout, 分割面板
 * @example
 * <SplitPane first={<LeftPanel />} second={<RightPanel />} />
 */
function SplitPane({
  className,
  direction = "horizontal",
  defaultSize = 50,
  minSize = 20,
  maxSize = 80,
  onResize,
  first,
  second,
  resizer = true,
  ...props
}: SplitPaneProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState(defaultSize);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);

      const container = containerRef.current;
      if (!container) return;

      const startPos = direction === "horizontal" ? e.clientX : e.clientY;
      const startSize = size;
      const containerSize =
        direction === "horizontal"
          ? container.offsetWidth
          : container.offsetHeight;

      const handleMouseMove = (e: MouseEvent) => {
        const currentPos = direction === "horizontal" ? e.clientX : e.clientY;
        const delta = currentPos - startPos;
        const newSize = startSize + (delta / containerSize) * 100;
        const clampedSize = Math.min(Math.max(newSize, minSize), maxSize);
        setSize(clampedSize);
        onResize?.(clampedSize);
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [direction, size, minSize, maxSize, onResize],
  );

  return (
    <div
      ref={containerRef}
      data-slot="split-pane"
      data-direction={direction}
      className={cn(
        "flex",
        direction === "horizontal" ? "flex-row" : "flex-col",
        isDragging && "select-none",
        className,
      )}
      {...props}
    >
      <div
        data-slot="split-pane-first"
        style={{
          [direction === "horizontal" ? "width" : "height"]: `${size}%`,
        }}
        className="overflow-auto"
      >
        {first}
      </div>
      {resizer && (
        <div
          data-slot="split-pane-resizer"
          className={cn(
            "bg-border hover:bg-ring/50 shrink-0 transition-colors",
            direction === "horizontal"
              ? "w-1 cursor-col-resize"
              : "h-1 cursor-row-resize",
            isDragging && "bg-ring",
          )}
          onMouseDown={handleMouseDown}
        />
      )}
      <div
        data-slot="split-pane-second"
        style={{
          [direction === "horizontal" ? "width" : "height"]: `${100 - size}%`,
        }}
        className="overflow-auto"
      >
        {second}
      </div>
    </div>
  );
}

export { SplitPane };
export type { SplitPaneProps };
