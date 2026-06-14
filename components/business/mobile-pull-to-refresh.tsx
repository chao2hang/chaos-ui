"use client";
import * as React from "react";
import { ArrowDownIcon } from "@/components/ui/icons";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface PullToRefreshProps extends React.ComponentProps<"div"> {
  onRefresh: () => Promise<void> | void;
  threshold?: number;
  disabled?: boolean;
  className?: string;
  refreshingText?: string;
  pullText?: string;
  releaseText?: string;
}

export function PullToRefresh({
  onRefresh,
  threshold = 60,
  disabled,
  className,
  refreshingText,
  pullText,
  releaseText,
  children,
  ...props
}: PullToRefreshProps) {
  const { t } = useTranslation("mobile");
  const resolvedRefreshingText =
    refreshingText ?? t("pullToRefresh.refreshing");
  const resolvedPullText = pullText ?? t("pullToRefresh.pull");
  const resolvedReleaseText = releaseText ?? t("pullToRefresh.release");
  const [startY, setStartY] = React.useState(0);
  const [distance, setDistance] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [enabled, setEnabled] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    if (disabled || refreshing) return;
    const el = containerRef.current;
    if (!el || el.scrollTop > 0) return;
    const touch = e.touches[0];
    if (!touch) return;
    setStartY(touch.clientY);
    setEnabled(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!enabled || disabled || refreshing) return;
    const touch = e.touches[0];
    if (!touch) return;
    const dy = touch.clientY - startY;
    if (dy > 0) {
      setDistance(Math.min(dy * 0.5, threshold * 1.5));
    }
  };

  const onTouchEnd = async () => {
    if (!enabled) return;
    setEnabled(false);
    if (distance >= threshold && !refreshing) {
      setRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setRefreshing(false);
        setDistance(0);
      }
    } else {
      setDistance(0);
    }
  };

  const state = refreshing
    ? "refreshing"
    : distance >= threshold
      ? "release"
      : distance > 0
        ? "pull"
        : "idle";
  const text = refreshing
    ? resolvedRefreshingText
    : state === "release"
      ? resolvedReleaseText
      : resolvedPullText;

  return (
    <div
      ref={containerRef}
      data-slot="pull-to-refresh"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className={cn("relative overflow-y-auto", className)}
      {...props}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-center gap-2 text-xs text-muted-foreground transition-opacity",
          state === "idle" ? "opacity-0" : "opacity-100",
        )}
        style={{ height: distance }}
      >
        <ArrowDownIcon
          className={cn(
            "size-4 transition-transform",
            state === "release" && "rotate-180",
            refreshing && "animate-spin",
          )}
        />
        <span>{text}</span>
      </div>
      <div
        style={{
          transform: `translateY(${distance}px)`,
          transition: enabled ? "none" : "transform 0.2s",
        }}
      >
        {children}
      </div>
    </div>
  );
}
