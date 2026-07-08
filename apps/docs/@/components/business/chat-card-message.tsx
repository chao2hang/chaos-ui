"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { ImageIcon } from "@/components/ui/icons";

/**
 * @component ChatCardMessage
 * @category business/chat
 * @since 0.7.0
 * @description 卡片消息（含标题、描述、缩略图、元数据与操作）
 * @keywords chat, card, message
 * @example
 * <ChatCardMessage title="Release v2" description="Shipped today" />
 */

interface ChatCardMessageProps {
  title: string;
  description?: string;
  thumbnail?: string;
  metadata?: Array<{ label: string; value: string }>;
  actions?: React.ReactNode;
  className?: string;
}

function ChatCardMessage({
  title = "",
  description,
  thumbnail,
  metadata,
  actions,
  className,
}: ChatCardMessageProps) {
  return (
    <div
      data-slot="chat-card-message"
      className={cn(
        "border-border bg-background flex w-full max-w-sm flex-col overflow-hidden rounded-lg border",
        className,
      )}
    >
      <div className="flex items-start gap-3 p-3">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt=""
            className="size-12 shrink-0 rounded-md object-cover"
            loading="lazy"
          />
        ) : (
          <span
            className="bg-muted flex size-12 shrink-0 items-center justify-center rounded-md"
            aria-hidden
          >
            <ImageIcon className="text-muted-foreground size-5" />
          </span>
        )}
        <div className="flex min-w-0 flex-1 flex-col">
          <h4 className="truncate text-sm font-semibold" title={title}>
            {title}
          </h4>
          {description ? (
            <p className="text-muted-foreground line-clamp-2 text-xs">
              {description}
            </p>
          ) : null}
        </div>
      </div>
      {metadata && metadata.length > 0 ? (
        <dl className="border-border bg-border grid grid-cols-2 gap-px border-t">
          {metadata.map((m) => (
            <div key={m.label} className="bg-background px-3 py-1.5">
              <dt className="text-muted-foreground text-[0.65rem] tracking-wide uppercase">
                {m.label}
              </dt>
              <dd
                className="text-foreground truncate text-xs font-medium"
                title={m.value}
              >
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
      {actions ? (
        <div className="border-border flex items-center justify-end gap-1 border-t px-3 py-2">
          {actions}
        </div>
      ) : null}
    </div>
  );
}

export { ChatCardMessage };
export type { ChatCardMessageProps };
