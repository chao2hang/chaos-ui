"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface CodeDiffViewerProps extends React.ComponentProps<"div"> {
  /** Old text to compare / 旧文本 */
  oldValue?: string;
  /** New text to compare / 新文本 */
  newValue?: string;
  /** Diff mode: unified or split / 差异模式：统一或分屏 */
  mode?: "unified" | "split";
  /** Language label (display only) / 语言标签（仅显示） */
  language?: string;
  /** Show line numbers / 显示行号 */
  showLineNumbers?: boolean;
  /** Number of context lines around changes / 变更上下文行数 */
  contextLines?: number;
}

type DiffLine = {
  type: "added" | "removed" | "context";
  oldLineNo: number | null;
  newLineNo: number | null;
  content: string;
};

function computeLCS(a: string[], b: string[]): number[][] {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0),
  );
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      const dpi = dp[i]!;
      const dpi1 = dp[i + 1]!;
      dpi[j] =
        a[i] === b[j] ? dpi1[j + 1]! + 1 : Math.max(dpi1[j]!, dpi[j + 1]!);
    }
  }
  return dp;
}

function diffLines(oldLines: string[], newLines: string[]): DiffLine[] {
  const dp = computeLCS(oldLines, newLines);
  const result: DiffLine[] = [];
  let i = 0;
  let j = 0;
  let oldNo = 1;
  let newNo = 1;

  while (i < oldLines.length || j < newLines.length) {
    const oldLine = oldLines[i];
    const newLine = newLines[j];
    const dpi = dp[i];
    if (i < oldLines.length && j < newLines.length && oldLine === newLine) {
      result.push({
        type: "context",
        oldLineNo: oldNo,
        newLineNo: newNo,
        content: oldLine!,
      });
      i++;
      j++;
      oldNo++;
      newNo++;
    } else if (
      j < newLines.length &&
      (i >= oldLines.length || dpi![j + 1]! >= dp[i + 1]![j]!)
    ) {
      result.push({
        type: "added",
        oldLineNo: null,
        newLineNo: newNo,
        content: newLine!,
      });
      j++;
      newNo++;
    } else if (i < oldLines.length) {
      result.push({
        type: "removed",
        oldLineNo: oldNo,
        newLineNo: null,
        content: oldLine!,
      });
      i++;
      oldNo++;
    } else {
      break;
    }
  }

  return result;
}

function applyContextLines(diff: DiffLine[], contextLines: number): DiffLine[] {
  // Mark lines that should be visible (changed lines + context)
  const visible = new Array(diff.length).fill(false);
  for (let i = 0; i < diff.length; i++) {
    const line = diff[i]!;
    if (line.type !== "context") {
      for (
        let k = Math.max(0, i - contextLines);
        k <= Math.min(diff.length - 1, i + contextLines);
        k++
      ) {
        visible[k] = true;
      }
    }
  }

  // Build result with collapse markers
  const result: DiffLine[] = [];
  let inCollapse = false;
  for (let i = 0; i < diff.length; i++) {
    if (visible[i]) {
      inCollapse = false;
      result.push(diff[i]!);
    } else if (!inCollapse) {
      inCollapse = true;
      result.push({
        type: "context",
        oldLineNo: null,
        newLineNo: null,
        content: "...",
      });
    }
  }
  return result;
}

/**
 * @component CodeDiffViewer
 * @category ui/data-display
 * @since 0.2.0
 * @description Code/text diff viewer with inline highlighting using LCS algorithm, supports unified and split modes / 代码差异查看器，使用 LCS 算法进行行内高亮，支持统一和分屏模式
 * @keywords diff, code, viewer, compare, lcs, 差异, 对比
 * @example
 * <CodeDiffViewer
 *   oldValue="line1\nline2\nline3"
 *   newValue="line1\nline2-modified\nline3"
 *   mode="unified"
 * />
 */
function CodeDiffViewer({
  className,
  oldValue = "",
  newValue = "",
  mode = "unified",
  language = "text",
  showLineNumbers = true,
  contextLines = 3,
  ...props
}: CodeDiffViewerProps) {
  const diff = React.useMemo(() => {
    const oldLines = oldValue.split("\n");
    const newLines = newValue.split("\n");
    const raw = diffLines(oldLines, newLines);
    return contextLines > 0 ? applyContextLines(raw, contextLines) : raw;
  }, [oldValue, newValue, contextLines]);

  const lineClass = (type: DiffLine["type"]) =>
    type === "added"
      ? "bg-green-500/10 text-green-700 dark:text-green-300"
      : type === "removed"
        ? "bg-red-500/10 text-red-700 dark:text-red-300"
        : "text-foreground";

  const linePrefix = (type: DiffLine["type"]) =>
    type === "added" ? "+" : type === "removed" ? "-" : " ";

  const renderLine = (
    line: DiffLine,
    side: "old" | "new" | "unified",
    key: string,
  ) => {
    const isCollapse =
      line.content === "..." &&
      line.oldLineNo === null &&
      line.newLineNo === null;
    if (isCollapse) {
      return (
        <div
          key={key}
          className="text-muted-foreground px-2 py-0.5 text-center text-xs italic"
        >
          {line.content}
        </div>
      );
    }

    const showOnSide =
      side === "unified" ||
      (side === "old" &&
        (line.type === "removed" || line.type === "context")) ||
      (side === "new" && (line.type === "added" || line.type === "context"));

    if (!showOnSide) {
      return <div key={key} className="border-transparent py-0.5" />;
    }

    const lineNo =
      side === "old"
        ? line.oldLineNo
        : side === "new"
          ? line.newLineNo
          : (line.newLineNo ?? line.oldLineNo);

    return (
      <div
        key={key}
        className={cn(
          "flex items-start py-0.5 font-mono text-xs",
          lineClass(line.type),
        )}
      >
        {showLineNumbers && (
          <span className="text-muted-foreground w-10 shrink-0 pr-2 text-right select-none">
            {lineNo ?? ""}
          </span>
        )}
        {side === "unified" && (
          <span className="w-4 shrink-0 text-center select-none">
            {linePrefix(line.type)}
          </span>
        )}
        <span className="px-2 whitespace-pre">{line.content || " "}</span>
      </div>
    );
  };

  return (
    <div
      data-slot="code-diff-viewer"
      className={cn(
        "bg-background border-border overflow-hidden rounded-lg border",
        className,
      )}
      {...props}
    >
      <div className="text-muted-foreground border-border flex items-center justify-between border-b px-3 py-1.5 text-xs">
        <span>{language}</span>
        <span className="flex gap-2">
          <span className="text-green-600 dark:text-green-400">
            +{diff.filter((d) => d.type === "added").length}
          </span>
          <span className="text-red-600 dark:text-red-400">
            -{diff.filter((d) => d.type === "removed").length}
          </span>
        </span>
      </div>
      <div className="overflow-x-auto">
        {mode === "unified" ? (
          <div className="py-1">
            {diff.map((line, i) => renderLine(line, "unified", `u-${i}`))}
          </div>
        ) : (
          <div className="divide-border grid grid-cols-2 divide-x">
            <div className="py-1">
              {diff.map((line, i) => renderLine(line, "old", `o-${i}`))}
            </div>
            <div className="py-1">
              {diff.map((line, i) => renderLine(line, "new", `n-${i}`))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export { CodeDiffViewer };
export type { CodeDiffViewerProps };
