"use client";
import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import { ChartSkeleton } from "./shared/chart-skeleton";
import { ChartEmpty } from "./shared/chart-empty";
import { ChartExportButton } from "./shared/chart-export";
import { ChartFullscreenButton } from "./shared/chart-fullscreen";

export function ChartFrame({
  data,
  loading,
  empty,
  height,
  enableExport,
  enableFullscreen,
  className,
  children,
}: {
  data: unknown[];
  loading?: boolean;
  empty?: boolean;
  height?: number;
  enableExport?: boolean;
  enableFullscreen?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  if (loading) return <ChartSkeleton height={height} className={className} />;
  if (empty || data.length === 0)
    return <ChartEmpty height={height} className={className} />;
  return (
    <div ref={ref} className={cn("relative", className)}>
      {(enableExport || enableFullscreen) && (
        <div className="absolute top-2 right-2 z-10 flex gap-1">
          {enableExport && <ChartExportButton target={ref} />}
          {enableFullscreen && <ChartFullscreenButton target={ref} />}
        </div>
      )}
      {children}
    </div>
  );
}
