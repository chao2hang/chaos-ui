"use client"
import * as React from "react"
import { BellIcon, CheckIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { EmptyState } from "@/components/business/empty-state"
import { formatRelativeTime } from "@/lib/format"

export interface NotificationItem {
  id: string
  title: string
  description?: string
  timestamp: number | Date | string
  read?: boolean
  type?: "info" | "success" | "warning" | "error"
  action?: { label: string; onClick: () => void }
}

interface NotificationCenterProps {
  notifications: NotificationItem[]
  onMarkRead?: (id: string) => void
  onMarkAllRead?: () => void
  onClear?: () => void
  onItemClick?: (item: NotificationItem) => void
  align?: "start" | "center" | "end"
  className?: string
  emptyText?: string
}

const typeStyles: Record<NonNullable<NotificationItem["type"]>, string> = {
  info: "bg-info/15 text-info",
  success: "bg-success/15 text-success",
  warning: "bg-warning/15 text-warning",
  error: "bg-destructive/15 text-destructive",
}

export function NotificationCenter({
  notifications,
  onMarkRead,
  onMarkAllRead,
  onClear,
  onItemClick,
  align = "end",
  className,
  emptyText = "暂无通知",
}: NotificationCenterProps) {
  const unread = notifications.filter((n) => !n.read).length

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className={cn("relative", className)}
            aria-label={`通知 ${unread > 0 ? `(${unread} 条未读)` : ""}`}
          />
        }
      >
        <BellIcon />
        {unread > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center overflow-visible rounded-full px-1 text-[0.6rem] tabular-nums"
          >
            {unread > 99 ? "99+" : unread}
          </Badge>
        )}
      </PopoverTrigger>
      <PopoverContent align={align} className="flex max-h-[32rem] w-80 flex-col gap-0 overflow-hidden p-0">
        <div className="flex shrink-0 items-center justify-between border-b px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">通知</span>
            {unread > 0 && (
              <Badge variant="secondary" className="text-[0.65rem]">
                {unread} 未读
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            {onMarkAllRead && unread > 0 && (
              <Button
                size="sm"
                variant="ghost"
                onClick={onMarkAllRead}
                className="h-7 px-2 text-xs"
              >
                全部已读
              </Button>
            )}
            {onClear && notifications.length > 0 && (
              <Button
                size="sm"
                variant="ghost"
                onClick={onClear}
                className="h-7 px-2 text-xs"
                aria-label="清空"
              >
                <XIcon />
              </Button>
            )}
          </div>
        </div>
        <ScrollArea className="min-h-0 flex-1">
          {notifications.length === 0 ? (
            <div className="py-4">
              <EmptyState
                variant="default"
                title={emptyText}
                description="没有新通知"
                className="py-6"
              />
            </div>
          ) : (
            <ul className="flex flex-col">
              {notifications.map((n) => (
                <li
                  key={n.id}
                  className={cn(
                    "group flex cursor-pointer gap-2 border-b px-3 py-2.5 transition-colors last:border-0 hover:bg-muted/50",
                    !n.read && "bg-muted/30"
                  )}
                  onClick={() => {
                    onItemClick?.(n)
                    if (!n.read) onMarkRead?.(n.id)
                  }}
                >
                  <div
                    className={cn(
                      "mt-0.5 size-2 shrink-0 rounded-full",
                      n.read ? "bg-transparent" : (typeStyles[n.type ?? "info"])
                    )}
                  />
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium leading-tight">{n.title}</p>
                      {!n.read && (
                        <span
                          role="button"
                          aria-label="标记已读"
                          onClick={(e) => {
                            e.stopPropagation()
                            onMarkRead?.(n.id)
                          }}
                          className="opacity-0 group-hover:opacity-100"
                        >
                          <CheckIcon className="size-3.5 text-muted-foreground hover:text-foreground" />
                        </span>
                      )}
                    </div>
                    {n.description && (
                      <p className="text-xs text-muted-foreground">{n.description}</p>
                    )}
                    <div className="flex items-center justify-between pt-0.5">
                      <span className="text-[0.65rem] text-muted-foreground">
                        {formatRelativeTime(n.timestamp)}
                      </span>
                      {n.action && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            n.action?.onClick()
                          }}
                          className="text-[0.65rem] text-primary hover:underline"
                        >
                          {n.action.label}
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
