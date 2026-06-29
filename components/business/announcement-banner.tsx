"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { XIcon, AlertTriangleIcon, InfoIcon, BellIcon } from "@/components/ui"
import { Button } from "@/components/ui"

type BannerPriority = "info" | "warning" | "critical"

interface Announcement {
  id: string
  title: string
  content?: string
  priority: BannerPriority
  link?: string
  dismissible?: boolean
}

interface AnnouncementBannerProps {
  announcements: Announcement[]
  maxVisible?: number
  className?: string
  onDismiss?: (id: string) => void
  onViewAll?: () => void
}

const priorityIcons: Record<BannerPriority, React.ElementType> = {
  info: InfoIcon,
  warning: BellIcon,
  critical: AlertTriangleIcon,
}

const priorityClasses: Record<BannerPriority, string> = {
  info: "bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-950 dark:text-blue-100 dark:border-blue-800",
  warning: "bg-yellow-50 text-yellow-900 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-100 dark:border-yellow-800",
  critical: "bg-red-50 text-red-900 border-red-200 dark:bg-red-950 dark:text-red-100 dark:border-red-800",
}

/**
 * 站内公告横幅 —— 优先级排序、可关闭、可跳转。
 * 支持顶置/浮窗/全屏三种模式，通过嵌套位置决定。
 *
 * @component AnnouncementBanner
 * @category business/notification
 * @since 0.2.0
 */
function AnnouncementBanner({
  announcements,
  maxVisible = 3,
  className,
  onDismiss,
  onViewAll,
}: AnnouncementBannerProps) {
  const [dismissed, setDismissed] = React.useState<Set<string>>(new Set())

  const handleDismiss = (id: string) => {
    setDismissed((prev) => new Set(prev).add(id))
    onDismiss?.(id)
  }

  const visible = announcements
    .filter((a) => !dismissed.has(a.id))
    .sort((a, b) => {
      const order: Record<BannerPriority, number> = { critical: 0, warning: 1, info: 2 }
      return order[a.priority] - order[b.priority]
    })

  if (visible.length === 0) return null

  const shown = visible.slice(0, maxVisible)
  const hidden = visible.length - shown.length

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {shown.map((announcement) => {
        const Icon = priorityIcons[announcement.priority]

        return (
          <div
            key={announcement.id}
            className={cn("relative flex items-start gap-2.5 rounded-lg border px-3 py-2.5 text-sm", priorityClasses[announcement.priority])}
          >
            <Icon className="mt-0.5 size-4 shrink-0" />
            <div className="min-w-0 flex-1">
              {announcement.link ? (
                <a
                  href={announcement.link}
                  className="font-medium underline underline-offset-2 hover:no-underline"
                >
                  {announcement.title}
                </a>
              ) : (
                <span className="font-medium">{announcement.title}</span>
              )}
              {announcement.content && (
                <p className="mt-0.5 opacity-80">{announcement.content}</p>
              )}
            </div>
            {(announcement.dismissible !== false) && (
              <Button
                variant="ghost"
                size="icon-xs"
                className="size-5 shrink-0 opacity-60 hover:opacity-100"
                onClick={() => handleDismiss(announcement.id)}
              >
                <XIcon className="size-3" />
              </Button>
            )}
          </div>
        )
      })}

      {hidden > 0 && onViewAll && (
        <Button
          variant="ghost"
          size="sm"
          className="self-start text-xs text-muted-foreground"
          onClick={onViewAll}
        >
          查看全部 {visible.length} 条公告
        </Button>
      )}
    </div>
  )
}

export { AnnouncementBanner }
export type { AnnouncementBannerProps, Announcement, BannerPriority }
