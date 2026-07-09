"use client";

import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import {
  CheckCircle2Icon,
  Loader2Icon,
  XCircleIcon,
  ClockIcon,
} from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component TaskProgress
 * @category business/dashboard
 * @since 0.7.0
 * @description 任务进度条 — 展示单个异步任务的完成百分比、状态与可选提示信息。
 * @keywords task, progress
 * @param percent 完成百分比 0–100
 * @param status 任务状态文本（如 running / success / failed / pending）
 * @param message 可选的状态提示信息
 * @param className 根节点额外类名
 * @example
 * <TaskProgress percent={75} status="running" message="正在生成报表…" />
 */
interface TaskProgressProps {
  percent: number;
  status: string;
  message?: string;
  className?: string;
}

const STATUS_ICONS: Record<string, React.ReactNode> = {
  running: <Loader2Icon className="text-primary size-4 animate-spin" />,
  success: <CheckCircle2Icon className="size-4 text-emerald-500" />,
  done: <CheckCircle2Icon className="size-4 text-emerald-500" />,
  failed: <XCircleIcon className="text-destructive size-4" />,
  error: <XCircleIcon className="text-destructive size-4" />,
  pending: <ClockIcon className="text-muted-foreground size-4" />,
};

function isTerminal(status: string): boolean {
  const s = status.toLowerCase();
  return s === "success" || s === "done" || s === "failed" || s === "error";
}

function TaskProgress({
  percent,
  status,
  message,
  className,
}: TaskProgressProps) {
  const clamped = Math.max(0, Math.min(100, percent));
  const icon = STATUS_ICONS[status.toLowerCase()];
  const terminal = isTerminal(status);

  return (
    <div
      data-slot="task-progress"
      className={cn("flex flex-col gap-1.5", className)}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center justify-between gap-2 text-sm">
        <span className="flex items-center gap-1.5 font-medium">
          {icon ?? <ClockIcon className="text-muted-foreground size-4" />}
          <span>{status}</span>
        </span>
        <span className="text-muted-foreground tabular-nums">
          {clamped.toFixed(0)}%
        </span>
      </div>
      <div
        className="bg-muted relative h-2 w-full overflow-hidden rounded-full"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clamped}
        aria-label={`任务进度 ${clamped.toFixed(0)}%`}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all",
            terminal &&
              status.toLowerCase() !== "success" &&
              status.toLowerCase() !== "done"
              ? "bg-destructive"
              : "bg-primary",
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {message ? (
        <p className="text-muted-foreground text-xs">{message}</p>
      ) : null}
    </div>
  );
}

export { TaskProgress };
export type { TaskProgressProps };
