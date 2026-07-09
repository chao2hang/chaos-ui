"use client";
import { BellIcon, CheckIcon, XIcon } from "@chaos_team/chaos-ui/ui-icons";
import { cn } from "@chaos_team/chaos-ui/lib";
import { Button } from "@chaos_team/chaos-ui/ui";
import { Badge } from "@chaos_team/chaos-ui/ui";
import { ScrollArea } from "@chaos_team/chaos-ui/ui";
import { Popover, PopoverContent, PopoverTrigger } from "@chaos_team/chaos-ui/ui";
import { useTranslation } from "react-i18next";
import { EmptyState } from "@chaos_team/chaos-ui/ui";
import { formatRelativeTime } from "@chaos_team/chaos-ui/lib";

export interface NotificationItem {
  id: string;
  title: string;
  description?: string;
  timestamp: number | Date | string;
  read?: boolean;
  type?: "info" | "success" | "warning" | "error";
  action?: { label: string; onClick: () => void };
}

interface NotificationCenterProps {
  notifications: NotificationItem[];
  onMarkRead?: (id: string) => void;
  onMarkAllRead?: () => void;
  onClear?: () => void;
  onItemClick?: (item: NotificationItem) => void;
  align?: "start" | "center" | "end";
  className?: string;
  emptyText?: string;
}

const typeStyles: Record<NonNullable<NotificationItem["type"]>, string> = {
  info: "bg-info/15 text-info",
  success: "bg-success/15 text-success",
  warning: "bg-warning/15 text-warning",
  error: "bg-destructive/15 text-destructive",
};

/**
 * @component NotificationCenter
 * @category business/ux
 * @since 0.2.0
 * @description Notification bell with popover panel, unread badge, mark-read/clear-all actions, and type-styled indicators / 通知铃铛组件，含弹出面板、未读标记、已读/清空操作和类型样式指示器
 * @keywords notification, bell, popover, unread, badge, alert
 * @example
 * <NotificationCenter notifications={[{ id: "1", title: "Hello", timestamp: Date.now() }]} />
 */
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
  const { t } = useTranslation("notification");
  const unread = notifications.filter((n) => !n.read).length;

  const resolvedEmptyText =
    emptyText === "暂无通知" ? t("notificationCenter.emptyText") : emptyText;

  return (
    <Popover data-slot="notification-center">
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className={cn("relative", className)}
            aria-label={t("notificationCenter.ariaLabel", {
              unreadText:
                unread > 0
                  ? t("notificationCenter.ariaLabelUnread", { count: unread })
                  : "",
            })}
          />
        }
      >
        <BellIcon />
        {unread > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full p-0 text-[0.6rem]"
          >
            {unread > 99 ? "99+" : unread}
          </Badge>
        )}
      </PopoverTrigger>
      <PopoverContent align={align} className="w-80 p-0">
        <div className="flex items-center justify-between border-b px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">
              {t("notificationCenter.title")}
            </span>
            {unread > 0 && (
              <Badge variant="secondary" className="text-[0.65rem]">
                {t("notificationCenter.unreadCount", { count: unread })}
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
                {t("notificationCenter.markAllRead")}
              </Button>
            )}
            {onClear && notifications.length > 0 && (
              <Button
                size="sm"
                variant="ghost"
                onClick={onClear}
                className="h-7 px-2 text-xs"
                aria-label={t("notificationCenter.clear")}
              >
                <XIcon />
              </Button>
            )}
          </div>
        </div>
        <ScrollArea className="max-h-80">
          {notifications.length === 0 ? (
            <div className="py-4">
              <EmptyState
                variant="default"
                title={resolvedEmptyText}
                description={t("notificationCenter.emptyDescription")}
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
                    !n.read && "bg-muted/30",
                  )}
                  onClick={() => {
                    onItemClick?.(n);
                    if (!n.read) onMarkRead?.(n.id);
                  }}
                >
                  <div
                    className={cn(
                      "mt-0.5 size-2 shrink-0 rounded-full",
                      n.read ? "bg-transparent" : typeStyles[n.type ?? "info"],
                    )}
                  />
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium leading-tight">
                        {n.title}
                      </p>
                      {!n.read && (
                        <span
                          role="button"
                          aria-label={t("notificationCenter.markRead")}
                          onClick={(e) => {
                            e.stopPropagation();
                            onMarkRead?.(n.id);
                          }}
                          className="opacity-0 group-hover:opacity-100"
                        >
                          <CheckIcon className="size-3.5 text-muted-foreground hover:text-foreground" />
                        </span>
                      )}
                    </div>
                    {n.description && (
                      <p className="text-xs text-muted-foreground">
                        {n.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between pt-0.5">
                      <span className="text-[0.65rem] text-muted-foreground">
                        {formatRelativeTime(n.timestamp)}
                      </span>
                      {n.action && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            n.action?.onClick();
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
  );
}
