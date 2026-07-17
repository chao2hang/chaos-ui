"use client";
import * as React from "react";
import { BellIcon, CheckIcon, XIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { Badge } from "@/components/ui";
import { ScrollArea } from "@/components/ui";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";
import { EmptyState } from "@/components/ui/empty-state";
import { formatRelativeTime } from "@/lib/format";

export interface NotificationItem {
  id: string;
  title: string;
  description?: string;
  timestamp: number | Date | string;
  read?: boolean;
  type?: "info" | "success" | "warning" | "error";
  action?: { label: string; onClick: () => void };
  /** Click-through href (opens in new tab). / 点击跳转链接 */
  href?: string;
  /** Category key for tab filtering. / 分类键（用于 tab 筛选） */
  category?: string;
  /** Severity level for styling. / 严重级别 */
  level?: "info" | "success" | "warning" | "error";
}

/** Tab descriptor for category filtering. / 分类 tab 描述 */
export interface NotificationTab {
  key: string;
  label: string;
  /** Optional unread/count badge. / 可选未读数徽标 */
  count?: number;
}

interface NotificationCenterProps {
  notifications: NotificationItem[];
  onMarkRead?: (id: string) => void;
  onMarkAllRead?: () => void;
  onClear?: () => void;
  onItemClick?: (item: NotificationItem) => void;
  /** Category tabs (additive). / 分类 tab */
  tabs?: NotificationTab[];
  /** Active tab key (controlled). / 当前激活 tab */
  activeTab?: string;
  /** Tab change callback. / tab 切换回调 */
  onTabChange?: (key: string) => void;
  /** Load-more callback (renders a "load more" button when set). / 加载更多回调 */
  onLoadMore?: () => void;
  /** Whether more items are loading. / 是否正在加载更多 */
  loadingMore?: boolean;
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
  tabs,
  activeTab,
  onTabChange,
  onLoadMore,
  loadingMore = false,
  align = "end",
  className,
  emptyText = "暂无通知",
}: NotificationCenterProps) {
  const { t } = useTranslation("notification");
  const [internalTab, setInternalTab] = React.useState<string | undefined>(
    activeTab ?? tabs?.[0]?.key,
  );
  const currentTab = activeTab ?? internalTab;

  const visibleNotifications = React.useMemo(() => {
    if (!tabs || !currentTab || currentTab === "all") return notifications;
    return notifications.filter((n) => n.category === currentTab);
  }, [notifications, tabs, currentTab]);

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
        {tabs && tabs.length > 0 && (
          <div className="flex items-center gap-1 border-b px-2 py-1.5">
            <button
              type="button"
              onClick={() => {
                setInternalTab("all");
                onTabChange?.("all");
              }}
              className={cn(
                "rounded-md px-2 py-1 text-xs transition-colors",
                !currentTab || currentTab === "all"
                  ? "bg-accent font-medium"
                  : "text-muted-foreground hover:bg-muted",
              )}
            >
              {t("notificationCenter.allTabs", { defaultValue: "全部" })}
            </button>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => {
                  setInternalTab(tab.key);
                  onTabChange?.(tab.key);
                }}
                className={cn(
                  "flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-colors",
                  currentTab === tab.key
                    ? "bg-accent font-medium"
                    : "text-muted-foreground hover:bg-muted",
                )}
              >
                {tab.label}
                {tab.count != null && tab.count > 0 && (
                  <span className="bg-primary/10 text-primary rounded-full px-1 text-[0.6rem]">
                    {tab.count > 99 ? "99+" : tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
        <ScrollArea className="max-h-80">
          {visibleNotifications.length === 0 ? (
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
              {visibleNotifications.map((n) => (
                <li
                  key={n.id}
                  className={cn(
                    "group hover:bg-muted/50 flex cursor-pointer gap-2 border-b px-3 py-2.5 transition-colors last:border-0",
                    !n.read && "bg-muted/30",
                  )}
                  onClick={() => {
                    onItemClick?.(n);
                    if (!n.read) onMarkRead?.(n.id);
                    if (n.href) window.open(n.href, "_blank", "noreferrer");
                  }}
                >
                  <div
                    className={cn(
                      "mt-0.5 size-2 shrink-0 rounded-full",
                      n.read
                        ? "bg-transparent"
                        : typeStyles[n.level ?? n.type ?? "info"],
                    )}
                  />
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm leading-tight font-medium">
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
                          <CheckIcon className="text-muted-foreground hover:text-foreground size-3.5" />
                        </span>
                      )}
                    </div>
                    {n.description && (
                      <p className="text-muted-foreground text-xs">
                        {n.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between pt-0.5">
                      <span className="text-muted-foreground text-[0.65rem]">
                        {formatRelativeTime(n.timestamp)}
                      </span>
                      {n.action && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            n.action?.onClick();
                          }}
                          className="text-primary text-[0.65rem] hover:underline"
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
          {onLoadMore && visibleNotifications.length > 0 && (
            <div className="border-t p-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs"
                disabled={loadingMore}
                onClick={onLoadMore}
              >
                {loadingMore
                  ? t("notificationCenter.loading", { defaultValue: "加载中…" })
                  : t("notificationCenter.loadMore", {
                      defaultValue: "加载更多",
                    })}
              </Button>
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
