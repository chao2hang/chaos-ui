"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export type SwipeDirection = "left" | "right" | "up" | "down";

interface SwipeActionsProps extends React.ComponentProps<"div"> {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
  disabled?: boolean;
  leftAction?: {
    label: string;
    color?: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  rightAction?: {
    label: string;
    color?: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  className?: string;
}

export function SwipeActions({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 80,
  disabled,
  leftAction,
  rightAction,
  className,
  children,
  ...props
}: SwipeActionsProps) {
  const [start, setStart] = React.useState<{ x: number; y: number } | null>(
    null,
  );
  const [delta, setDelta] = React.useState(0);
  const [axis, setAxis] = React.useState<"x" | "y" | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    if (disabled) return;
    const touch = e.touches[0];
    if (!touch) return;
    setStart({ x: touch.clientX, y: touch.clientY });
    setDelta(0);
    setAxis(null);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!start || disabled) return;
    const touch = e.touches[0];
    if (!touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (!axis) {
      setAxis(Math.abs(dx) > Math.abs(dy) ? "x" : "y");
    }
    if (axis === "x" || (!axis && Math.abs(dx) > Math.abs(dy))) {
      setDelta(dx);
    } else if (axis === "y" || (!axis && Math.abs(dy) > Math.abs(dx))) {
      setDelta(dy);
    }
  };

  const onTouchEnd = () => {
    if (disabled || delta === 0) {
      setStart(null);
      setDelta(0);
      setAxis(null);
      return;
    }
    const ax = Math.abs(delta);
    if (ax >= threshold) {
      if (axis === "x") {
        if (delta > 0) {
          if (rightAction) rightAction.onClick();
          onSwipeRight?.();
        } else {
          if (leftAction) leftAction.onClick();
          onSwipeLeft?.();
        }
      } else if (axis === "y") {
        if (delta > 0) onSwipeDown?.();
        else onSwipeUp?.();
      }
    }
    setStart(null);
    setDelta(0);
    setAxis(null);
  };

  const action = delta > 0 ? rightAction : leftAction;
  const showAction = Math.abs(delta) > 20 && action;

  return (
    <div
      data-slot="swipe-actions"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      {showAction && (
        <div
          className={cn(
            "absolute inset-y-0 flex items-center justify-center px-4 text-sm font-medium text-white",
            delta > 0 ? "left-0" : "right-0",
          )}
          style={{
            backgroundColor: action.color ?? "#ef4444",
            width: Math.abs(delta),
          }}
        >
          <span className="flex items-center gap-1.5">
            {action.icon}
            {action.label}
          </span>
        </div>
      )}
      <div
        className="relative bg-background transition-transform"
        style={{
          transform: `translateX(${delta}px)`,
          transition: start ? "none" : "transform 0.2s",
        }}
      >
        {children}
      </div>
    </div>
  );
}
