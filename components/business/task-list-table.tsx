"use client";

import { cn } from "@/lib/utils";

/**
 * @component TaskListTable
 * @category business/dashboard
 * @since 0.7.0
 * @description 任务列表表
 * @keywords task, list, table
 * @example
 * <TaskListTable />
 */

interface TaskListTableProps {
  tasks: Array<{
    id: string;
    title: string;
    status: string;
    priority: string;
    assignee?: string;
    deadline?: string;
  }>;
  className?: string;
}

function TaskListTable({ className }: TaskListTableProps) {
  return (
    <div data-slot="task-list-table" className={cn("", className)}>
      {null}
    </div>
  );
}

export { TaskListTable };
export type { TaskListTableProps };
