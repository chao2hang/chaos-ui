"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ClockIcon, RotateCcwIcon, EyeIcon } from "lucide-react";

export interface VersionEntry {
  id: string;
  version: string;
  author: string;
  date: string;
  summary: string;
  current?: boolean;
}

interface VersionHistoryProps extends React.ComponentProps<"div"> {
  entries: VersionEntry[];
  onRestore?: (version: VersionEntry) => void;
  onView?: (version: VersionEntry) => void;
  className?: string;
}

function VersionHistory({
  entries,
  onRestore,
  onView,
  className,
  ...props
}: VersionHistoryProps) {
  if (entries.length === 0) {
    return (
      <div
        data-slot="version-history"
        className={cn(
          "text-muted-foreground flex flex-col items-center justify-center py-12",
          className,
        )}
        {...props}
      >
        <ClockIcon className="size-8 opacity-40" />
        <p className="mt-2 text-sm">暂无版本历史</p>
      </div>
    );
  }

  return (
    <div
      data-slot="version-history"
      className={cn("space-y-2", className)}
      {...props}
    >
      {entries.map((entry, i) => (
        <div
          key={entry.id}
          className={cn(
            "flex items-start gap-4 rounded-lg border p-3",
            entry.current && "border-primary/50 bg-primary/5",
          )}
        >
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-full border-2",
                entry.current
                  ? "border-primary bg-primary/10"
                  : "border-muted bg-muted/20",
              )}
            >
              <span className="text-xs font-bold">{entry.version}</span>
            </div>
            {i < entries.length - 1 && (
              <span
                className="bg-border mt-1 h-full min-h-[16px] w-px"
                aria-hidden
              />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium">v{entry.version}</span>
              {entry.current && (
                <Badge variant="secondary" className="text-[10px]">
                  当前版本
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground mt-0.5 text-sm">
              {entry.summary}
            </p>
            <div className="text-muted-foreground mt-1 flex items-center gap-2 text-xs">
              <span>{entry.author}</span>
              <span>·</span>
              <span>{entry.date}</span>
            </div>
            <div className="mt-2 flex items-center gap-1">
              {onView && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 text-xs"
                  onClick={() => onView(entry)}
                >
                  <EyeIcon className="size-3" /> 查看
                </Button>
              )}
              {onRestore && !entry.current && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 text-xs"
                  onClick={() => onRestore(entry)}
                >
                  <RotateCcwIcon className="size-3" /> 恢复
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export { VersionHistory };
export type { VersionHistoryProps, VersionEntry };
