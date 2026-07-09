"use client";

import { cn } from "@chaos_team/chaos-ui/lib";
import { formatDateTime } from "@chaos_team/chaos-ui/lib";

/**
 * @component TaskHistory
 * @category business/dashboard
 * @since 0.7.0
 * @description 历史任务记录 — 以表格展示历史任务类型、状态、起止时间。
 * @keywords task, history
 * @param tasks 历史任务数组，每项含 id/type/status/startTime/endTime
 * @param className 根节点额外类名
 * @example
 * <TaskHistory tasks={[{ id:"1", type:"导出", status:"完成", startTime:"2026-01-01T09:00:00Z" }]} />
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

function TaskHistory({ tasks = [], className }: TaskHistoryProps) {
  return (
    <div
      data-slot="task-history"
      className={cn("ring-border overflow-x-auto rounded-lg ring-1", className)}
    >
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-muted-foreground">
          <tr>
            <th scope="col" className="px-3 py-2 text-left font-medium">
              任务ID
            </th>
            <th scope="col" className="px-3 py-2 text-left font-medium">
              类型
            </th>
            <th scope="col" className="px-3 py-2 text-left font-medium">
              状态
            </th>
            <th scope="col" className="px-3 py-2 text-left font-medium">
              开始时间
            </th>
            <th scope="col" className="px-3 py-2 text-left font-medium">
              结束时间
            </th>
          </tr>
        </thead>
        <tbody className="divide-border divide-y">
          {tasks.map((task) => (
            <tr key={task.id} className="hover:bg-muted/30">
              <td className="px-3 py-2 tabular-nums">{task.id}</td>
              <td className="px-3 py-2">{task.type}</td>
              <td className="px-3 py-2">
                <span className="bg-muted rounded px-1.5 py-0.5 text-xs">
                  {task.status}
                </span>
              </td>
              <td className="text-muted-foreground px-3 py-2 tabular-nums">
                {formatDateTime(task.startTime)}
              </td>
              <td className="text-muted-foreground px-3 py-2 tabular-nums">
                {task.endTime ? formatDateTime(task.endTime) : "—"}
              </td>
            </tr>
          ))}
          {tasks.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="text-muted-foreground px-3 py-6 text-center"
              >
                暂无历史任务
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}

export { TaskHistory };
export type { TaskHistoryProps };
