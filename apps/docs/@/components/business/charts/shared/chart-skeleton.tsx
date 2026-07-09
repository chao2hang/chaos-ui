"use client";
import * as React from "react";
import { Loader2Icon } from "lucide-react";
import { cn } from "@chaos_team/chaos-ui/lib";

export function ChartSkeleton({
  height = 320,
  className,
}: {
  height?: number;
  className?: string;
}) {
  return (
    <div
      data-slot="chart-skeleton"
      role="status"
      aria-label="图表加载中"
      className={cn(
        "bg-muted/20 flex items-center justify-center rounded-md border",
        className,
      )}
      style={{ height }}
    >
      <Loader2Icon className="text-muted-foreground size-6 animate-spin" />
    </div>
  );
}
