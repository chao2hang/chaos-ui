import * as React from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Timeline, TimelineItem, TimelineDot, TimelineConnector, TimelineContent } from "@/components/ui/timeline"

interface ActivityUser {
  name: string
  avatarUrl?: string
}

interface ActivityItem {
  id?: string
  user: string | ActivityUser
  action: string
  time: string
  target?: string
  icon?: React.ReactNode
  avatarFallback?: string
  variant?: "default" | "success" | "warning" | "destructive" | "info"
}

function userDisplayName(user: ActivityItem["user"]): string {
  if (typeof user === "string") return user
  return user.name
}

function userFallback(user: ActivityItem["user"]): string {
  if (typeof user === "string") {
    return user
      .split(/\s+/)
      .map((p) => p[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase()
  }
  return userFallback(user.name)
}

function ActivityFeed({ items = [], onLoadMore, hasMore, className }: {
  items?: ActivityItem[]
  onLoadMore?: () => void
  hasMore?: boolean
  className?: string
}) {
  const groups = React.useMemo(() => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    const todayStr = today.toDateString()
    const yesterdayStr = yesterday.toDateString()

    const grouped: Record<string, ActivityItem[]> = { today: [], yesterday: [], earlier: [] }
    items.forEach((item) => {
      const d = new Date(item.time)
      if (d.toDateString() === todayStr) grouped.today.push(item)
      else if (d.toDateString() === yesterdayStr) grouped.yesterday.push(item)
      else grouped.earlier.push(item)
    })
    return grouped
  }, [items])

  const renderItem = (item: ActivityItem, i: number) => {
    const fallback = item.avatarFallback ?? userFallback(item.user)
    return (
      <TimelineItem key={item.id ?? `${item.time}-${i}`}>
        <div className="flex flex-col items-center self-stretch">
          <TimelineDot variant={item.variant}>
            {item.icon ?? (
              fallback ? (
                <Avatar className="size-6">
                  <AvatarFallback className="text-[0.6rem]">{fallback}</AvatarFallback>
                </Avatar>
              ) : null
            )}
          </TimelineDot>
          <TimelineConnector />
        </div>
        <TimelineContent>
          <p className="text-sm">
            <span className="font-medium">{userDisplayName(item.user)}</span>{" "}
            <span className="text-muted-foreground">{item.action}</span>
            {item.target ? (
              <>
                {" "}
                <span className="font-medium">{item.target}</span>
              </>
            ) : null}
          </p>
          <time className="text-xs text-muted-foreground">
            {new Date(item.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </time>
        </TimelineContent>
      </TimelineItem>
    )
  }

  const renderGroup = (title: string, groupItems: ActivityItem[]) => {
    if (groupItems.length === 0) return null
    return (
      <div className="mb-6">
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</h4>
        <Timeline>{groupItems.map(renderItem)}</Timeline>
      </div>
    )
  }

  return (
    <div className={cn(className)}>
      {renderGroup("Today", groups.today)}
      {renderGroup("Yesterday", groups.yesterday)}
      {renderGroup("Earlier", groups.earlier)}
      {hasMore && (
        <Button variant="outline" size="sm" onClick={onLoadMore} className="w-full mt-2">
          Load more
        </Button>
      )}
      {items.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">No activity yet.</p>
      )}
    </div>
  )
}

export { ActivityFeed }
export type { ActivityItem, ActivityUser }
