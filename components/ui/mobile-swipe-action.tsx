"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * @component MobileSwipeAction
 * @category UI
 * @since 1.0.0-beta.0
 * @description 滑动操作行，左右拖拽揭示操作按钮
 * @example
 * ```tsx
 * <MobileSwipeAction
 *   rightActions={[{ key: "delete", label: "删除", onClick: handleDelete, color: "destructive" }]}
 * >
 *   <Row />
 * </MobileSwipeAction>
 * ```
 */
export interface SwipeActionDef {
  key: string;
  label: string;
  onClick: () => void;
  color?: "default" | "primary" | "destructive";
}

export interface MobileSwipeActionProps {
  /** 左侧操作按钮 / left action buttons */
  leftActions?: SwipeActionDef[];
  /** 右侧操作按钮 / right action buttons */
  rightActions?: SwipeActionDef[];
  /** 行内容 / row content */
  children?: React.ReactNode;
  /** 附加类名 / extra class */
  className?: string;
  /** 单个操作按钮宽度(px) / action button width */
  actionWidth?: number;
}

function MobileSwipeAction({
  leftActions = [],
  rightActions = [],
  children,
  className,
  actionWidth = 80,
}: MobileSwipeActionProps) {
  const [offset, setOffset] = React.useState(0);
  const startXRef = React.useRef<number | null>(null);
  const draggingRef = React.useRef(false);
  const baseRef = React.useRef(0);

  const leftWidth = leftActions.length * actionWidth;
  const rightWidth = rightActions.length * actionWidth;

  const colorClass = (color?: SwipeActionDef["color"]) => {
    if (color === "destructive") return "bg-destructive/80 text-destructive-foreground";
    if (color === "primary") return "bg-primary text-primary-foreground";
    return "bg-muted text-foreground";
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    startXRef.current = event.touches[0]?.clientX ?? null;
    draggingRef.current = true;
    baseRef.current = offset;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!draggingRef.current || startXRef.current === null) return;
    const currentX = event.touches[0]?.clientX ?? 0;
    const delta = currentX - startXRef.current;
    let next = baseRef.current + delta;
    // clamp within action ranges
    if (next > 0) next = Math.min(next, leftWidth);
    if (next < 0) next = Math.max(next, -rightWidth);
    setOffset(next);
  };

  const handleTouchEnd = () => {
    draggingRef.current = false;
    startXRef.current = null;
    // snap: open if dragged more than half an action width
    if (offset > actionWidth / 2) {
      setOffset(leftWidth);
    } else if (offset < -actionWidth / 2) {
      setOffset(-rightWidth);
    } else {
      setOffset(0);
    }
  };

  const closeAndRun = (action: SwipeActionDef) => {
    setOffset(0);
    action.onClick();
  };

  return (
    <div
      data-slot="mobile-swipe-action"
      className={cn("relative overflow-hidden touch-none select-none", className)}
    >
      {/* left actions */}
      {leftActions.length > 0 ? (
        <div
          data-slot="mobile-swipe-action-left"
          className="absolute inset-y-0 left-0 flex"
        >
          {leftActions.map((action) => (
            <button
              key={action.key}
              type="button"
              data-slot="mobile-swipe-action-button"
              aria-label={action.label}
              onClick={() => closeAndRun(action)}
              style={{ width: `${actionWidth}px` }}
              className={cn(
                "flex items-center justify-center text-sm text-white",
                colorClass(action.color),
              )}
            >
              {action.label}
            </button>
          ))}
        </div>
      ) : null}

      {/* right actions */}
      {rightActions.length > 0 ? (
        <div
          data-slot="mobile-swipe-action-right"
          className="absolute inset-y-0 right-0 flex"
        >
          {rightActions.map((action) => (
            <button
              key={action.key}
              type="button"
              data-slot="mobile-swipe-action-button"
              aria-label={action.label}
              onClick={() => closeAndRun(action)}
              style={{ width: `${actionWidth}px` }}
              className={cn(
                "flex items-center justify-center text-sm text-white",
                colorClass(action.color),
              )}
            >
              {action.label}
            </button>
          ))}
        </div>
      ) : null}

      <div
        data-slot="mobile-swipe-action-content"
        className="relative bg-background transition-transform"
        style={{ transform: `translateX(${offset}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
    </div>
  );
}

export { MobileSwipeAction };
