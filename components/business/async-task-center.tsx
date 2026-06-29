"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { XIcon, AlertCircleIcon, CheckCircleIcon, ClockIcon, RefreshCwIcon, DownloadIcon, ChevronDownIcon } from "@/components/ui"
import { Button } from "@/components/ui"
import { Badge } from "@/components/ui"
import { Progress } from "@/components/ui"
import { ScrollArea } from "@/components/ui"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui"

type TaskStatus = "pending" | "running" | "completed" | "failed"

interface AsyncTask {
  id: string
  type: string
  title: string
  status: TaskStatus
  progress: number
  message?: string
  createdAt: Date
  resultUrl?: string
  errorMsg?: string
}

interface AsyncTaskCenterProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  tasks: AsyncTask[]
  onCancelTask?: (taskId: string) => void
  onRetryTask?: (taskId: string) => void
  onDownloadResult?: (taskId: string) => void
  className?: string
}

const statusConfig: Record<TaskStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: React.ElementType }> = {
  pending: { label: "等待中", variant: "outline", icon: ClockIcon },
  running: { label: "执行中", variant: "default", icon: RefreshCwIcon },
  completed: { label: "已完成", variant: "secondary", icon: CheckCircleIcon },
  failed: { label: "失败", variant: "destructive", icon: AlertCircleIcon },
}

/**
 * 异步任务中心 —— 全局抽屉入口，展示所有异步任务。
 * 支持取消/重试/下载结果。
 *
 * @component AsyncTaskCenter
 * @category business/async
 * @since 0.2.0
 */
function AsyncTaskCenter({
  open,
  onOpenChange,
  tasks,
  onCancelTask,
  onRetryTask,
  onDownloadResult,
  className,
}: AsyncTaskCenterProps) {
  const [expandedTask, setExpandedTask] = React.useState<string | null>(null)

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className={cn("w-[400px] max-w-[90vw]", className)}>
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle>任务中心</DrawerTitle>
              <DrawerDescription>
                {tasks.length} 个任务
              </DrawerDescription>
            </div>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon-sm">
                <XIcon className="size-4" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <CheckCircleIcon className="mb-3 size-12" />
            <p className="text-sm">暂无任务</p>
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="divide-y">
              {tasks.map((task) => {
                const cfg = statusConfig[task.status]
                const Icon = cfg.icon
                const isExpanded = expandedTask === task.id

                return (
                  <div key={task.id} className="px-4 py-3">
                    <div
                      className="flex cursor-pointer items-start gap-3"
                      onClick={() => setExpandedTask(isExpanded ? null : task.id)}
                    >
                      <Icon
                        className={cn(
                          "mt-0.5 size-4 shrink-0",
                          task.status === "running" && "animate-spin",
                          task.status === "failed" && "text-destructive",
                          task.status === "completed" && "text-green-500",
                        )}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-sm font-medium">
                            {task.title}
                          </p>
                          <Badge variant={cfg.variant} className="shrink-0 text-[10px]">
                            {cfg.label}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {task.type} · {task.createdAt.toLocaleTimeString()}
                        </p>

                        {(task.status === "running" || task.status === "pending") && (
                          <div className="mt-2">
                            <Progress value={task.progress} className="h-1.5" />
                            <p className="mt-1 text-[10px] text-muted-foreground">
                              {task.message || `${task.progress}%`}
                            </p>
                          </div>
                        )}

                        {isExpanded && (
                          <div className="mt-2 flex gap-1.5">
                            {(task.status === "pending" || task.status === "running") && onCancelTask && (
                              <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); onCancelTask(task.id) }}>
                                取消
                              </Button>
                            )}
                            {task.status === "failed" && onRetryTask && (
                              <Button size="sm" onClick={(e) => { e.stopPropagation(); onRetryTask(task.id) }}>
                                重试
                              </Button>
                            )}
                            {task.status === "completed" && onDownloadResult && (
                              <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); onDownloadResult(task.id) }}>
                                <DownloadIcon className="mr-1 size-3" />
                                下载结果
                              </Button>
                            )}
                          </div>
                        )}

                        {task.status === "failed" && task.errorMsg && isExpanded && (
                          <p className="mt-1.5 rounded bg-destructive/10 px-2 py-1 text-xs text-destructive">
                            {task.errorMsg}
                          </p>
                        )}
                      </div>
                      <ChevronDownIcon
                        className={cn(
                          "mt-1 size-4 shrink-0 text-muted-foreground transition-transform",
                          isExpanded && "rotate-180",
                        )}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </ScrollArea>
        )}
      </DrawerContent>
    </Drawer>
  )
}

export { AsyncTaskCenter }
export type { AsyncTaskCenterProps, AsyncTask, TaskStatus }
