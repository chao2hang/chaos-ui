import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  Button,
  Timeline,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@/components/ui";

interface ActivityItem {
  user: string;
  action: string;
  time: string;
  avatarFallback?: string;
  variant?: "default" | "success" | "warning" | "destructive" | "info";
}

function formatActivityTime(time: string): string {
  const date = new Date(time);
  if (Number.isNaN(date.getTime())) return time;
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * @component ActivityFeed
 * @category business/ux
 * @since 0.2.0
 * @description Chronological activity feed with timeline layout and grouped by day / 按天分组的活动时间线
 * @keywords activity, timeline, feed, history
 * @example
 * <ActivityFeed items={[{ user: "Alice", action: "created campaign", time: new Date().toISOString() }]} />
 */
function ActivityFeed({
  items = [],
  onLoadMore,
  hasMore,
  className,
}: {
  items?: ActivityItem[];
  onLoadMore?: () => void;
  hasMore?: boolean;
  className?: string;
}) {
  const groups = React.useMemo(() => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const todayStr = today.toDateString();
    const yesterdayStr = yesterday.toDateString();

    const grouped: Record<string, ActivityItem[]> = {
      today: [],
      yesterday: [],
      earlier: [],
    };
    items.forEach((item) => {
      const d = new Date(item.time);
      if (Number.isNaN(d.getTime())) {
        (grouped.earlier ?? []).push(item);
        return;
      }
      if (d.toDateString() === todayStr) (grouped.today ?? []).push(item);
      else if (d.toDateString() === yesterdayStr)
        (grouped.yesterday ?? []).push(item);
      else (grouped.earlier ?? []).push(item);
    });
    return grouped;
  }, [items]);

  const renderGroup = (title: string, groupItems: ActivityItem[]) => {
    if (groupItems.length === 0) return null;
    return (
      <div className="mb-6">
        <h4 className="text-muted-foreground mb-3 text-xs font-semibold tracking-wider uppercase">
          {title}
        </h4>
        <Timeline>
          {groupItems.map((item, i) => (
            // Compose primitives directly — TimelineItem already renders its own
            // dot/connector and would nest children incorrectly here.
            <div key={i} className="relative flex gap-4">
              <div className="flex flex-col items-center self-stretch">
                <TimelineDot variant={item.variant ?? "default"}>
                  {item.avatarFallback ? (
                    <Avatar className="size-6">
                      <AvatarFallback className="text-[0.6rem]">
                        {item.avatarFallback}
                      </AvatarFallback>
                    </Avatar>
                  ) : null}
                </TimelineDot>
                <TimelineConnector />
              </div>
              <TimelineContent className="pb-8">
                <p className="text-sm">
                  <span className="font-medium">{item.user}</span>{" "}
                  <span className="text-muted-foreground">{item.action}</span>
                </p>
                <time className="text-muted-foreground text-xs">
                  {formatActivityTime(item.time)}
                </time>
              </TimelineContent>
            </div>
          ))}
        </Timeline>
      </div>
    );
  };

  return (
    <div data-slot="activity-feed" className={cn(className)}>
      {renderGroup("Today", groups.today ?? [])}
      {renderGroup("Yesterday", groups.yesterday ?? [])}
      {renderGroup("Earlier", groups.earlier ?? [])}
      {hasMore && (
        <Button
          variant="outline"
          size="sm"
          onClick={onLoadMore}
          className="mt-2 w-full"
        >
          Load more
        </Button>
      )}
      {items.length === 0 && (
        <p className="text-muted-foreground py-8 text-center text-sm">
          No activity yet.
        </p>
      )}
    </div>
  );
}

export { ActivityFeed };
export type { ActivityItem };
