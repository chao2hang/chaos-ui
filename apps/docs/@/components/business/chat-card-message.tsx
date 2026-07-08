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

function ChatCardMessage({ title, description, thumbnail, metadata, actions, className }: ChatCardMessageProps) {
  return (
    <div
      data-slot="chat-card-message"
      className={cn("flex w-full max-w-sm flex-col overflow-hidden rounded-lg border border-border bg-background", className)}
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
          <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-muted" aria-hidden>
            <ImageIcon className="size-5 text-muted-foreground" />
          </span>
        )}
        <div className="flex min-w-0 flex-1 flex-col">
          <h4 className="truncate text-sm font-semibold" title={title}>{title}</h4>
          {description ? (
            <p className="line-clamp-2 text-xs text-muted-foreground">{description}</p>
          ) : null}
        </div>
      </div>
      {metadata && metadata.length > 0 ? (
        <dl className="grid grid-cols-2 gap-px border-t border-border bg-border">
          {metadata.map((m) => (
            <div key={m.label} className="bg-background px-3 py-1.5">
              <dt className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">{m.label}</dt>
              <dd className="truncate text-xs font-medium text-foreground" title={m.value}>{m.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {actions ? (
        <div className="flex items-center justify-end gap-1 border-t border-border px-3 py-2">
          {actions}
        </div>
      ) : null}
    </div>
  );
}

export { ChatCardMessage };
export type { ChatCardMessageProps };
