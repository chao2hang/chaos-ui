"use client";
import * as React from "react";

import { cn } from "@chaos_team/chaos-ui/lib";
import { Avatar, AvatarFallback, AvatarImage } from "@chaos_team/chaos-ui/ui";
import { initials } from "@chaos_team/chaos-ui/lib";

/**
 * @component ChatMessageBubble
 * @category business/chat
 * @since 0.7.0
 * @description 消息气泡
 * @keywords chat, message, bubble
 * @example
 * <ChatMessageBubble role="user" content="Hello" />
 */

interface ChatMessageBubbleProps {
  role: "user" | "assistant" | "system";
  content: string;
  avatar?: React.ReactNode;
  name?: string;
  time?: string;
  status?: string;
  className?: string;
}

function ChatMessageBubble({
  role,
  content,
  avatar,
  name,
  time,
  status,
  className,
}: ChatMessageBubbleProps) {
  const isUser = role === "user";
  const isSystem = role === "system";
  const displayName =
    name ?? (isUser ? "You" : isSystem ? "System" : "Assistant");

  if (isSystem) {
    return (
      <div
        data-slot="chat-message-bubble"
        role="status"
        className={cn(
          "bg-muted text-muted-foreground mx-auto w-fit max-w-full rounded-md px-3 py-1.5 text-center text-xs",
          className,
        )}
      >
        <span className="sr-only">System message</span>
        {content}
        {time ? (
          <span className="ml-2 tabular-nums opacity-70">{time}</span>
        ) : null}
      </div>
    );
  }

  return (
    <div
      data-slot="chat-message-bubble"
      className={cn(
        "flex w-full gap-2",
        isUser ? "flex-row-reverse" : "flex-row",
        className,
      )}
    >
      <Avatar size="sm" className="mt-0.5">
        {avatar ?? (
          <>
            <AvatarImage alt={displayName} />
            <AvatarFallback>{initials(displayName)}</AvatarFallback>
          </>
        )}
      </Avatar>
      <div
        className={cn(
          "flex max-w-[80%] flex-col gap-0.5",
          isUser ? "items-end" : "items-start",
        )}
      >
        <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
          <span className="text-foreground font-medium">{displayName}</span>
          {time ? <span className="tabular-nums">{time}</span> : null}
          {status ? (
            <span aria-label={`Status: ${status}`}>{status}</span>
          ) : null}
        </div>
        <div
          className={cn(
            "rounded-2xl px-3 py-2 text-sm break-words whitespace-pre-wrap",
            isUser
              ? "bg-primary text-primary-foreground rounded-tr-sm"
              : "bg-muted text-foreground rounded-tl-sm",
          )}
        >
          {content}
        </div>
      </div>
    </div>
  );
}

export { ChatMessageBubble };
export type { ChatMessageBubbleProps };
