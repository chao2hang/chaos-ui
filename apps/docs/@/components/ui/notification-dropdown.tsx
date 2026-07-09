"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  BellIcon,
  CheckCheckIcon,
  InfoIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  XCircleIcon,
} from "@/components/ui/icons";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";

interface NotificationItem {
  /** Unique id / 唯一标识 */
  id: string;
  /** Notification title / 标题 */
  title: string;
  /** Description text / 描述内容 */
  description?: string;
  /** Timestamp (ms or Date) / 时间戳 */
  timestamp: number | string | Date;
  /** Whether the notification has been read / 是否已读 */
  read?: boolean;
  /** Notification type / 通知类型 */
  type?: "info" | "success" | "warning" | "error";
}

interface NotificationDropdownProps extends Omit<
  React.ComponentProps<"div">,
  "onError"
> {
  /** Notification list / 通知列表 */
  notifications?: NotificationItem[];
  /** Mark a single notification as read / 标记单条为已读 */
  onRead?: (id: string) => void;
  /** Mark all as read / 标记全部已读 */
  onReadAll?: () => void;
  /** Clear all notifications / 清除全部通知 */
  onClear?: () => void;
  /** View all callback / 查看全部回调 */
  onViewAll?: () => void;
  /** Unread count (computed if not provided) / 未读数量（不提供则自动计算） */
  unreadCount?: number;
}

const typeIconMap = {
  info: InfoIcon,
  success: CheckCircleIcon,
  warning: AlertTriangleIcon,
  error: XCircleIcon,
} as const;

const typeColorMap = {
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  error: "text-destructive",
} as const;

function formatRelativeTime(timestamp: number | string | Date): string {
  const now = Date.now();
  const time = new Date(timestamp).getTime();
  const diff = Math.max(now - time, 0);
  const minutes = Math.floor(diff / 60_000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return "just now";
}

/**
 * @component NotificationDropdown
 * @category ui/feedback
 * @since 0.2.0
 * @description Notification dropdown panel for header, showing a list of notifications with type icons, unread indicators, and relative timestamps / 头部通知下拉面板，展示带类型图标、未读指示器和相对时间的通知列表
 * @keywords notification, dropdown, panel, header, bell, unread
 * @example
 * <NotificationDropdown
 *   notifications={[{ id: "1", title: "New message", timestamp: Date.now() }]}
 *   onRead={(id) => console.log(id)}
 * />
 */
function NotificationDropdown({
  className,
  notifications = [],
  onRead,
  onReadAll,
  onClear,
  onViewAll,
  unreadCount,
  ...props
}: NotificationDropdownProps) {
  const computedUnread =
    unreadCount ?? notifications.filter((n) => !n.read).length;

  return (
    <div
      data-slot="notification-dropdown"
      className={cn("relative inline-flex", className)}
      {...props}
    >
      <Popover>
        <PopoverTrigger
          render={
            <button
              type="button"
              className="hover:bg-muted relative rounded-md p-2"
              aria-label="Notifications"
            >
              <BellIcon className="text-foreground size-5" />
              {computedUnread > 0 && (
                <span className="ring-background absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] leading-none font-medium text-white ring-2">
                  {computedUnread > 99 ? "99+" : computedUnread}
                </span>
              )}
            </button>
          }
        />
        <PopoverContent align="end" sideOffset={4} className="w-80 p-0">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-3 py-2">
            <span className="text-sm font-medium">Notifications</span>
            <span className="text-muted-foreground text-xs">
              {computedUnread} unread
            </span>
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="text-muted-foreground flex flex-col items-center gap-2 py-8 text-sm">
                <BellIcon className="size-8 opacity-30" />
                No notifications
              </div>
            ) : (
              notifications.map((n) => {
                const Icon = (n.type && typeIconMap[n.type]) || BellIcon;
                const color = n.type
                  ? typeColorMap[n.type]
                  : "text-muted-foreground";
                return (
                  <div
                    key={n.id}
                    onClick={() => onRead?.(n.id)}
                    className={cn(
                      "hover:bg-muted flex cursor-pointer gap-3 border-b px-3 py-2.5 last:border-b-0",
                      !n.read && "bg-accent/30",
                    )}
                  >
                    <Icon className={cn("mt-0.5 size-5 shrink-0", color)} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium">
                          {n.title}
                        </span>
                        {!n.read && (
                          <span className="bg-primary size-2 shrink-0 rounded-full" />
                        )}
                      </div>
                      {n.description && (
                        <p className="text-muted-foreground truncate text-xs">
                          {n.description}
                        </p>
                      )}
                      <span className="text-muted-foreground mt-0.5 block text-[11px]">
                        {formatRelativeTime(n.timestamp)}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t px-3 py-2">
            <button
              type="button"
              onClick={onReadAll}
              className="hover:bg-muted text-foreground flex items-center gap-1.5 rounded text-xs"
            >
              <CheckCheckIcon className="size-3.5" />
              Mark all read
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClear}
                className="text-muted-foreground hover:text-foreground text-xs"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={onViewAll}
                className="text-primary hover:text-primary/80 text-xs"
              >
                View all
              </button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export { NotificationDropdown };
export type { NotificationItem, NotificationDropdownProps };
