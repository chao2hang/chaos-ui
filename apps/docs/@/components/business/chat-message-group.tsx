"use client";
import * as React from "react";

import { cn } from "@chaos_team/chaos-ui/lib";
import { Avatar, AvatarFallback, AvatarImage } from "@chaos_team/chaos-ui/ui";
import { initials } from "@chaos_team/chaos-ui/lib";

/**
 * @component ChatMessageGroup
 * @category business/chat
 * @since 0.7.0
 * @description 消息分组（同一发送者多条消息聚合显示）
 * @keywords chat, message, group
 * @example
 * <ChatMessageGroup sender="Alice" messages={[{ id: "1", content: "Hi" }]} />
 */

interface ChatMessageGroupProps {
  sender: string;
  avatar?: React.ReactNode;
  messages: Array<{ id: string; content: string; time?: string }>;
  className?: string;
}

function ChatMessageGroup({
  sender = "",
  avatar,
  messages = [],
  className,
}: ChatMessageGroupProps) {
  const lastWithTime = [...messages]
    .reverse()
    .find((m) => m.time !== undefined);

  return (
    <div
      data-slot="chat-message-group"
      className={cn("flex gap-2", className)}
      aria-label={`Messages from ${sender}`}
    >
      <Avatar size="sm" className="mt-0.5">
        {avatar ?? (
          <>
            <AvatarImage alt={sender} />
            <AvatarFallback>{initials(sender)}</AvatarFallback>
          </>
        )}
      </Avatar>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-baseline gap-1.5">
          <span className="text-foreground text-xs font-semibold">
            {sender}
          </span>
          {lastWithTime?.time ? (
            <span className="text-muted-foreground text-[0.65rem] tabular-nums">
              {lastWithTime.time}
            </span>
          ) : null}
        </div>
        <ul role="list" className="flex flex-col gap-1">
          {messages.map((m) => (
            <li
              key={m.id}
              className="bg-muted w-fit max-w-full rounded-2xl rounded-tl-sm px-3 py-2 text-sm break-words whitespace-pre-wrap"
            >
              {m.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export { ChatMessageGroup };
export type { ChatMessageGroupProps };
