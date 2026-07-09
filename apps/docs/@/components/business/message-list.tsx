"use client";
import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import { formatRelativeTime } from "@chaos_team/chaos-ui/lib";
import {
  BellIcon,
  InfoIcon,
  AlertTriangleIcon,
  CheckCircle2Icon,
} from "@chaos_team/chaos-ui/ui";

/**
 * @component MessageList
 * @category Business
 * @since 1.0.0-beta.0
 * @description 消息列表(站内信) — 展示站内通知列表，支持类型图标、已读状态与点击查看回调。
 * @param messages 消息数组，每项含 id/title/content(可选)/type/time/read(可选)
 * @param onSelect 选中消息回调，参数为消息 id
 * @param onMarkAllRead 全部标记已读回调
 * @example
 * ```tsx
 * <MessageList
 *   messages={[{ id: "m1", title: "审批通过", type: "success", time: "2026-06-30T10:00:00Z" }]}
 * />
 * ```
 */
interface MessageListProps {
  /** 消息数组 */
  messages?: Array<{
    id: string;
    title: string;
    content?: string;
    type?: "info" | "warning" | "success" | "default";
    time?: string | number | Date;
    read?: boolean;
  }>;
  /** 选中消息回调 */
  onSelect?: (id: string) => void;
  /** 全部标记已读回调 */
  onMarkAllRead?: () => void;
  className?: string;
}

const TYPE_META: Record<
  NonNullable<MessageListProps["messages"]>[number]["type"] & string,
  { icon: React.ComponentType<{ className?: string }>; tone: string }
> = {
  info: { icon: InfoIcon, tone: "text-blue-500" },
  warning: { icon: AlertTriangleIcon, tone: "text-yellow-500" },
  success: { icon: CheckCircle2Icon, tone: "text-emerald-500" },
  default: { icon: BellIcon, tone: "text-muted-foreground" },
};

function MessageList({
  messages = [],
  onSelect,
  onMarkAllRead,
  className,
}: MessageListProps) {
  const unread = messages.filter((m) => !m.read).length;

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect?.(id);
    }
  };

  return (
    <div
      data-slot="message-list"
      className={cn(
        "bg-card flex flex-col gap-2 rounded-lg border p-3",
        className,
      )}
      role="region"
      aria-label="站内消息列表"
    >
      <div className="flex items-center justify-between px-1">
        <span className="flex items-center gap-2 text-sm font-medium">
          消息通知
          {unread > 0 && (
            <span className="bg-destructive text-destructive-foreground rounded-full px-1.5 py-0.5 text-xs">
              {unread} 条未读
            </span>
          )}
        </span>
        {unread > 0 && onMarkAllRead && (
          <button
            type="button"
            onClick={onMarkAllRead}
            className="text-primary text-xs hover:underline"
          >
            全部已读
          </button>
        )}
      </div>
      <ul className="flex flex-col divide-y" role="list">
        {messages.map((m) => {
          const type = m.type ?? "default";
          const meta = TYPE_META[type];
          const Icon = meta.icon;
          return (
            <li key={m.id}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => onSelect?.(m.id)}
                onKeyDown={(e) => handleKeyDown(e, m.id)}
                className={cn(
                  "hover:bg-muted/50 focus-visible:ring-ring flex cursor-pointer items-start gap-2.5 rounded-md px-2 py-2.5 transition-colors focus-visible:ring-2 focus-visible:outline-none",
                  !m.read && "bg-primary/5",
                )}
                aria-label={`消息 ${m.title}${m.read ? "" : " 未读"}`}
              >
                <Icon className={cn("mt-0.5 size-4 shrink-0", meta.tone)} />
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    {!m.read && (
                      <span
                        className="bg-destructive size-1.5 shrink-0 rounded-full"
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={cn(
                        "truncate text-sm",
                        !m.read && "font-medium",
                      )}
                    >
                      {m.title}
                    </span>
                    {m.time && (
                      <span className="text-muted-foreground ml-auto shrink-0 text-xs">
                        {formatRelativeTime(m.time)}
                      </span>
                    )}
                  </div>
                  {m.content && (
                    <span className="text-muted-foreground truncate text-xs">
                      {m.content}
                    </span>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {messages.length === 0 && (
        <p className="text-muted-foreground py-6 text-center text-sm">
          暂无消息
        </p>
      )}
    </div>
  );
}

export { MessageList };
export type { MessageListProps };
