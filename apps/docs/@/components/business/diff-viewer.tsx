"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface DiffViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  left: string;
  right: string;
  leftTitle?: string;
  rightTitle?: string;
  className?: string;
}

function DiffViewer({
  left,
  right,
  leftTitle = "修改前",
  rightTitle = "修改后",
  className,
  ...props
}: DiffViewerProps) {
  const leftLines = left.split("\n");
  const rightLines = right.split("\n");
  const maxLen = Math.max(leftLines.length, rightLines.length);

  return (
    <div
      data-slot="diff-viewer"
      className={cn(
        "bg-border grid grid-cols-2 gap-px overflow-hidden rounded-lg font-mono text-sm",
        className,
      )}
      {...props}
    >
      <div className="bg-muted/30 text-muted-foreground px-3 py-1.5 text-xs font-medium">
        {leftTitle}
      </div>
      <div className="bg-muted/30 text-muted-foreground px-3 py-1.5 text-xs font-medium">
        {rightTitle}
      </div>
      {Array.from({ length: maxLen }).map((_, i) => {
        const l = leftLines[i] ?? "";
        const r = rightLines[i] ?? "";
        const changed = l !== r;
        return (
          <React.Fragment key={i}>
            <pre
              className={cn(
                "bg-background min-h-[1.5rem] px-3 py-0.5 whitespace-pre-wrap",
                changed &&
                  "bg-red-50 text-red-900 dark:bg-red-950/20 dark:text-red-200",
              )}
            >
              {l || "\u00A0"}
            </pre>
            <pre
              className={cn(
                "bg-background min-h-[1.5rem] px-3 py-0.5 whitespace-pre-wrap",
                changed &&
                  "bg-green-50 text-green-900 dark:bg-green-950/20 dark:text-green-200",
              )}
            >
              {r || "\u00A0"}
            </pre>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export { DiffViewer };
export type { DiffViewerProps };
