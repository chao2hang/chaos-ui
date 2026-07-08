"use client";

import { cn } from "@/lib/utils";
import { formatDateTime } from "@/lib/format";
import { UserIcon } from "@/components/ui/icons";

/**
 * @component OperationLog
 * @category business/bill
 * @since 0.7.0
 * @description 操作日志列表 — 以时间线形式展示单据/系统的操作动作、操作人、时间与详情。
 * @keywords operation, log
 * @param logs 日志条目数组，每项含 id/action/operator/timestamp/detail
 * @param className 根节点额外类名
 * @example
 * <OperationLog logs={[{ id:"1", action:"审批通过", operator:"李四", timestamp:"2026-01-01T09:00:00Z" }]} />
 */
interface OperationLogProps {
  logs: Array<{
    id: string;
    action: string;
    operator: string;
    timestamp: string;
    detail?: string;
  }>;
  className?: string;
}

function OperationLog({ logs = [], className }: OperationLogProps) {
  return (
    <ol
      data-slot="operation-log"
      className={cn("flex flex-col gap-3", className)}
      role="list"
    >
      {logs.map((log) => (
        <li key={log.id} className="relative flex gap-3 pl-5">
          <span
            aria-hidden="true"
            className="bg-primary ring-primary/20 absolute top-1.5 left-0 size-2 rounded-full ring-2"
          />
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5">
              <span className="text-sm font-medium">{log.action}</span>
              <time
                className="text-muted-foreground text-xs tabular-nums"
                dateTime={log.timestamp}
              >
                {formatDateTime(log.timestamp)}
              </time>
            </div>
            <div className="text-muted-foreground mt-0.5 flex items-center gap-1 text-xs">
              <UserIcon className="size-3" />
              <span>{log.operator}</span>
            </div>
            {log.detail ? (
              <p className="text-muted-foreground mt-1 text-xs">{log.detail}</p>
            ) : null}
          </div>
        </li>
      ))}
      {logs.length === 0 ? (
        <li className="text-muted-foreground py-4 text-center text-sm">
          暂无操作日志
        </li>
      ) : null}
    </ol>
  );
}

export { OperationLog };
export type { OperationLogProps };
