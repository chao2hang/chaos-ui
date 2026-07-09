"use client";
import { cn } from "@chaos_team/chaos-ui/lib";
import { PinIcon } from "@chaos_team/chaos-ui/ui";
import { formatDate } from "@chaos_team/chaos-ui/lib";
/**
 * @component AnnouncementCard
 * @category business/dashboard
 * @since 0.7.0
 * @description 公告卡片
 */
interface AnnouncementCardProps {
title: string;
  content: string;
  date?: string;
  pinned?: boolean;
  className?: string;
}
function AnnouncementCard({ title, content, date, pinned, className }: AnnouncementCardProps) {
  return (
    <div data-slot="announcement-card" className={cn("relative rounded-lg border bg-card p-4", pinned && "border-primary/40", className)}>
      {pinned && <PinIcon className="absolute right-3 top-3 size-4 text-primary" aria-label="置顶" />}
      <div className="font-medium">{title}</div>
      <p className="mt-1 text-sm text-muted-foreground">{content}</p>
      {date && <div className="mt-2 text-xs text-muted-foreground">{formatDate(date)}</div>}
    </div>
  );
}
export { AnnouncementCard };
export type { AnnouncementCardProps };
