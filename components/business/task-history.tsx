"use client";

import { cn } from "@/lib/utils";

/**
 * @component TaskHistory
 * @category business/dashboard
 * @since 0.7.0
 * @description 历史任务记录
 * @keywords task, history
 * @example
 * <TaskHistory />
 */

interface TaskHistoryProps {
  tasks: Array<{
    id: string;
    type: string;
    status: string;
    startTime: string;
    endTime?: string;
  }>;
  className?: string;
}

function TaskHistory({ className }: TaskHistoryProps) {
  return (
    <div data-slot="task-history" className={cn("", className)}>
      {null}
    </div>
  );
}

export { TaskHistory };
export type { TaskHistoryProps };
