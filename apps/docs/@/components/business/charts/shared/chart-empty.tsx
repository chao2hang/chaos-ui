"use client";
import * as React from "react";
import { InboxIcon } from "lucide-react";
import { cn } from "@chaos_team/chaos-ui/lib";

interface ChartEmptyProps {
  height?: number;
  className?: string;
  message?: string;
}

export function ChartEmpty({
  height = 320,
  className,
  message = "暂无数据",
}: ChartEmptyProps) {
  return (
    <div
      data-slot="chart-empty"
      className={cn(
        "bg-muted/10 text-muted-foreground flex flex-col items-center justify-center gap-2 rounded-md border",
        className,
      )}
      style={{ height }}
    >
      <InboxIcon className="size-6" />
      <p className="text-xs">{message}</p>
    </div>
  );
}
