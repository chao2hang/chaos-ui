"use client";

import { cn } from "@/lib/utils";

/**
 * @component TaskProgress
 * @category business/dashboard
 * @since 0.7.0
 * @description 任务进度条
 * @keywords task, progress
 * @example
 * <TaskProgress />
 */

interface TaskProgressProps {
  percent: number;
  status: string;
  message?: string;
  className?: string;
}

function TaskProgress({ className }: TaskProgressProps) {
  return (
    <div data-slot="task-progress" className={cn("", className)}>
      {null}
    </div>
  );
}

export { TaskProgress };
export type { TaskProgressProps };
