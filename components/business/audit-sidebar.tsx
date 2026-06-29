"use client"

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui"
import { Badge } from "@/components/ui"

interface AuditLogEntry {
  id: string
  action: string
  operator: string
  time: Date
  details?: string
  field?: string
  oldValue?: string
  newValue?: string
  status?: "normal" | "warning" | "critical"
}

interface AuditSidebarProps {
  title?: string
  entries: AuditLogEntry[]
  loading?: boolean
  className?: string
}

const statusColors: Record<string, string> = {
  normal: "bg-muted text-muted-foreground",
  warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  critical: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
}

/**
 * 审计侧边栏 —— 展示操作日志/变更历史，常用于单据详情右侧面板。
 *
 * @component AuditSidebar
 * @category business/audit
 * @since 0.2.0
 */
function AuditSidebar({
  title = "操作日志",
  entries,
  loading = false,
  className,
}: AuditSidebarProps) {
  if (loading) {
    return (
      <div className={cn("p-4", className)}>
        <h4 className="mb-3 text-sm font-semibold">{title}</h4>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="animate-pulse space-y-1.5">
              <div className="h-3 w-1/2 rounded bg-muted" />
              <div className="h-2.5 w-2/3 rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <h4 className="shrink-0 px-4 py-3 text-sm font-semibold border-b">
        {title}
        <span className="ml-1.5 text-xs font-normal text-muted-foreground">
          ({entries.length})
        </span>
      </h4>
      <ScrollArea className="flex-1">
        {entries.length === 0 ? (
          <p className="p-4 text-sm text-muted-foreground">暂无操作记录</p>
        ) : (
          <div className="divide-y">
            {entries.map((entry) => (
              <div key={entry.id} className="p-3 text-sm">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium truncate">{entry.action}</p>
                  {entry.status && (
                    <Badge className={cn("shrink-0 text-[10px] px-1 py-0", statusColors[entry.status])}>
                      {entry.status}
                    </Badge>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {entry.operator} · {entry.time.toLocaleTimeString()}
                </p>
                {entry.field && entry.oldValue !== undefined && entry.newValue !== undefined && (
                  <div className="mt-1.5 rounded bg-muted/50 px-2 py-1 text-xs">
                    <span className="text-muted-foreground">{entry.field}:</span>{" "}
                    <span className="line-through text-muted-foreground/60">{entry.oldValue}</span>
                    <span className="mx-1 text-muted-foreground">→</span>
                    <span className="font-medium">{entry.newValue}</span>
                  </div>
                )}
                {entry.details && (
                  <p className="mt-1 text-xs text-muted-foreground">{entry.details}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}

export { AuditSidebar }
export type { AuditSidebarProps, AuditLogEntry }
