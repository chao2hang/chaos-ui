"use client";

import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/format";
import { ClockIcon } from "@/components/ui/icons";

/**
 * @component TaskListTable
 * @category business/dashboard
 * @since 0.7.0
 * @description 任务列表表 — 以表格展示任务标题、状态、优先级、负责人与截止日期。
 * @keywords task, list, table
 * @param tasks 任务数组，每项含 id/title/status/priority/assignee/deadline
 * @param className 根节点额外类名
 * @example
 * <TaskListTable tasks={[{ id:"1", title:"对账", status:"进行中", priority:"高" }]} />
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

function priorityClass(priority: string): string {
  const p = priority.toLowerCase();
  if (p === "高" || p === "high" || p === "urgent") {
    return "bg-destructive/10 text-destructive";
  }
  if (p === "中" || p === "medium" || p === "normal") {
    return "bg-amber-500/10 text-amber-600 dark:text-amber-500";
  }
  return "bg-muted text-muted-foreground";
}

function statusClass(status: string): string {
  const s = status.toLowerCase();
  if (s.includes("完成") || s === "done" || s === "completed" || s === "success") {
    return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-500";
  }
  if (s.includes("进行") || s === "running" || s === "active" || s === "in progress") {
    return "bg-primary/10 text-primary";
  }
  if (s.includes("取消") || s.includes("失败") || s === "failed" || s === "cancelled") {
    return "bg-destructive/10 text-destructive";
  }
  return "bg-muted text-muted-foreground";
}

function TaskListTable({ tasks = [], className }: TaskListTableProps) {
  return (
    <div
      data-slot="task-list-table"
      className={cn("overflow-x-auto rounded-lg ring-1 ring-border", className)}
    >
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-muted-foreground">
          <tr>
            <th scope="col" className="px-3 py-2 text-left font-medium">
              标题
            </th>
            <th scope="col" className="px-3 py-2 text-left font-medium">
              状态
            </th>
            <th scope="col" className="px-3 py-2 text-left font-medium">
              优先级
            </th>
            <th scope="col" className="px-3 py-2 text-left font-medium">
              负责人
            </th>
            <th scope="col" className="px-3 py-2 text-left font-medium">
              截止日期
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {tasks.map((task) => (
            <tr key={task.id} className="hover:bg-muted/30">
              <td className="px-3 py-2 font-medium">{task.title}</td>
              <td className="px-3 py-2">
                <span
                  className={cn(
                    "inline-flex rounded px-1.5 py-0.5 text-xs font-medium",
                    statusClass(task.status),
                  )}
                >
                  {task.status}
                </span>
              </td>
              <td className="px-3 py-2">
                <span
                  className={cn(
                    "inline-flex rounded px-1.5 py-0.5 text-xs font-medium",
                    priorityClass(task.priority),
                  )}
                >
                  {task.priority}
                </span>
              </td>
              <td className="px-3 py-2 text-muted-foreground">
                {task.assignee ?? "—"}
              </td>
              <td className="px-3 py-2 text-muted-foreground">
                {task.deadline ? (
                  <span className="inline-flex items-center gap-1">
                    <ClockIcon className="size-3" />
                    {formatDate(task.deadline)}
                  </span>
                ) : (
                  "—"
                )}
              </td>
            </tr>
          ))}
          {tasks.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-3 py-6 text-center text-muted-foreground">
                暂无任务
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}

export { TaskListTable };
export type { TaskListTableProps };
