"use client";
import { cn } from "@chaos_team/chaos-ui/lib";
import { formatRelativeTime } from "@chaos_team/chaos-ui/lib";
import { PaperclipIcon } from "@chaos_team/chaos-ui/ui";

/**
 * @component ImMessage
 * @category Business
 * @since 1.0.0-beta.0
 * @description IM 消息气泡 — 即时通讯单条消息，区分发送/接收方向，支持时间与附件。
 * @param direction 消息方向，sent(本人发送) 或 received(对方发送)
 * @param author 发送者名称
 * @param content 消息正文
 * @param timestamp 消息时间（ISO 字符串或时间戳）
 * @param attachments 附件文件名列表（可选）
 * @example
 * ```tsx
 * <ImMessage
 *   direction="sent"
 *   author="张三"
 *   content="请查收本月报表"
 *   timestamp="2026-06-30T10:00:00Z"
 *   attachments={["report.xlsx"]}
 * />
 * ```
 */
interface ImMessageProps {
  /** 消息方向 */
  direction?: "sent" | "received";
  /** 发送者名称 */
  author?: string;
  /** 消息正文 */
  content?: string;
  /** 消息时间 */
  timestamp?: string | number | Date;
  /** 附件文件名列表 */
  attachments?: Array<{ id: string; name: string; size?: number }>;
  /** 头像地址（可选） */
  avatarUrl?: string;
  className?: string;
}

function ImMessage({
  direction = "received",
  author = "",
  content = "",
  timestamp,
  attachments = [],
  avatarUrl,
  className,
}: ImMessageProps) {
  const isSent = direction === "sent";
  const time = timestamp !== undefined ? formatRelativeTime(timestamp) : "";
  const initial = author ? author.trim().charAt(0).toUpperCase() : "?";

  return (
    <div
      data-slot="im-message"
      className={cn(
        "flex w-full gap-2",
        isSent ? "flex-row-reverse" : "flex-row",
        className,
      )}
      role="article"
      aria-label={`${isSent ? "发送" : "接收"}消息${author ? `来自 ${author}` : ""}`}
    >
      <div
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-medium",
          isSent
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground",
        )}
        aria-hidden="true"
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt=""
            className="size-8 rounded-full object-cover"
          />
        ) : (
          initial
        )}
      </div>
      <div
        className={cn(
          "flex max-w-[75%] flex-col gap-1",
          isSent ? "items-end" : "items-start",
        )}
      >
        <div className="text-muted-foreground flex items-center gap-2 text-xs">
          {author && (
            <span className="text-foreground font-medium">{author}</span>
          )}
          {time && <span>{time}</span>}
        </div>
        <div
          className={cn(
            "rounded-2xl px-3 py-2 text-sm",
            isSent
              ? "bg-primary text-primary-foreground rounded-br-sm"
              : "bg-muted rounded-bl-sm",
          )}
        >
          {content || <span className="text-muted-foreground">（空消息）</span>}
        </div>
        {attachments.length > 0 && (
          <ul className="flex flex-col gap-1">
            {attachments.map((a) => (
              <li
                key={a.id}
                className={cn(
                  "flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs",
                  isSent
                    ? "border-primary/30 bg-primary/10"
                    : "border-border bg-background",
                )}
              >
                <PaperclipIcon className="size-3" />
                <span className="truncate">{a.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export { ImMessage };
export type { ImMessageProps };
