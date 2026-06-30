"use client";

import { cn } from "@/lib/utils";

/**
 * @component AnnouncementCard
 * @category business/dashboard
 * @since 0.7.0
 * @description 公告卡片
 * @keywords announcement, card
 * @example
 * <AnnouncementCard />
 */

interface AnnouncementCardProps {
  title: string;
  content: string;
  date?: string;
  pinned?: boolean;
  className?: string;
}

function AnnouncementCard({ className }: AnnouncementCardProps) {
  return (
    <div data-slot="announcement-card" className={cn("", className)}>
      {null}
    </div>
  );
}

export { AnnouncementCard };
export type { AnnouncementCardProps };
