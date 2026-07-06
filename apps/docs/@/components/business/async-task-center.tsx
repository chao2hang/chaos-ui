"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  RefreshCwIcon,
  Trash2Icon,
  CheckCircleIcon,
  XCircleIcon,
  Loader2Icon,
  ClockIcon,
} from "lucide-react";

export interface AsyncTask {
  id: string;
  name: string;
  type: string;
  status: "pending" | "running" | "completed" | "failed";
  progress?: number;
  createdAt: string;
  completedAt?: string;
  error?: string;
}

interface AsyncTaskCenterProps extends React.ComponentProps<"div"> {
  tasks: AsyncTask[];
  onRetry?: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
  className?: string;
}

const statusBadge: Record<
  AsyncTask["status"],
  {
    label: string;
    variant: "outline" | "default" | "destructive" | "secondary";
  }
> = {
  pending: { label: "等待中", variant: "outline" },
  running: { label: "执行中", variant: "default" },
  completed: { label: "已完成", variant: "secondary" },
  failed: { label: "失败", variant: "destructive" },
};

const statusIcons: Record<AsyncTask["status"], React.ElementType> = {
  pending: ClockIcon,
  running: Loader2Icon,
  completed: CheckCircleIcon,
  failed: XCircleIcon,
};

function AsyncTaskCenter({
  tasks,
  onRetry,
  onDelete,
  className,
  ...props
}: AsyncTaskCenterProps) {
  if (tasks.length === 0) {
    return (
      <div
        data-slot="async-task-center"
        className={cn(
          "text-muted-foreground flex flex-col items-center justify-center py-12",
          className,
        )}
        {...props}
      >
        <CheckCircleIcon className="size-8 opacity-40" />
        <p className="mt-2 text-sm">暂无异步任务</p>
      </div>
    );
  }

  return (
    <div
      data-slot="async-task-center"
      className={cn("space-y-2", className)}
      {...props}
    >
      {tasks.map((task) => {
        const Icon = statusIcons[task.status];
        const badge = statusBadge[task.status];
        return (
          <div
            key={task.id}
            className="bg-card flex items-center gap-3 rounded-lg border p-3 text-sm"
          >
            <Icon
              className={cn(
                "size-5 shrink-0",
                task.status === "running" && "text-primary animate-spin",
                task.status === "completed" && "text-success",
                task.status === "failed" && "text-destructive",
                task.status === "pending" && "text-muted-foreground",
              )}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate font-medium">{task.name}</span>
                <Badge variant={badge.variant}>{badge.label}</Badge>
              </div>
              {task.status === "running" && task.progress !== undefined && (
                <Progress value={task.progress} className="mt-1.5 h-1.5" />
              )}
              {task.error && (
                <p className="text-destructive mt-0.5 truncate text-xs">
                  {task.error}
                </p>
              )}
              <p className="text-muted-foreground mt-0.5 text-xs">
                {task.createdAt}
                {task.completedAt && ` · 完成于 ${task.completedAt}`}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              {task.status === "failed" && (
                <Button
                  size="icon-sm"
                  variant="ghost"
                  onClick={() => onRetry?.(task.id)}
                >
                  <RefreshCwIcon className="size-3.5" />
                </Button>
              )}
              <Button
                size="icon-sm"
                variant="ghost"
                onClick={() => onDelete?.(task.id)}
              >
                <Trash2Icon className="size-3.5" />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { AsyncTaskCenter };
export type { AsyncTaskCenterProps, AsyncTask };
