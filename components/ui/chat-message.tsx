"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * @component ChatMessage
 * @category UI
 * @since 1.0.0-beta.0
 * @description 消息气泡，按 role 对齐：用户靠右、助手靠左、系统居中
 * @example
 * ```tsx
 * <ChatMessage role="user" content="你好" name="张三" time="10:00" />
 * ```
 */
export interface ChatMessageProps {
  /** 角色 / message role */
  role?: "user" | "assistant" | "system";
  /** 消息内容 / message content */
  content?: string;
  /** 头像节点 / avatar node */
  avatar?: React.ReactNode;
  /** 发送者名称 / sender name */
  name?: string;
  /** 时间戳 / timestamp */
  time?: string;
  /** 附加类名 / extra class */
  className?: string;
}

function ChatMessage({
  role = "assistant",
  content,
  avatar,
  name,
  time,
  className,
}: ChatMessageProps) {
  const isUser = role === "user";
  const isSystem = role === "system";

  return (
    <div
      data-slot="chat-message"
      data-role={role}
      className={cn(
        "flex w-full gap-2",
        isUser && "flex-row-reverse justify-start",
        !isUser && !isSystem && "flex-row justify-start",
        isSystem && "justify-center",
        className,
      )}
    >
      {avatar != null && !isSystem ? (
        <div data-slot="chat-message-avatar" className="shrink-0">
          {avatar}
        </div>
      ) : null}
      <div
        data-slot="chat-message-body"
        className={cn(
          "flex max-w-[80%] flex-col gap-1",
          isUser && "items-end",
          !isUser && !isSystem && "items-start",
        )}
      >
        {(name != null || time != null) && !isSystem ? (
          <div
            data-slot="chat-message-meta"
            className="flex items-center gap-1 text-xs text-muted-foreground"
          >
            {name != null ? <span>{name}</span> : null}
            {time != null ? <span>{time}</span> : null}
          </div>
        ) : null}
        <div
          data-slot="chat-message-bubble"
          className={cn(
            "rounded-lg px-3 py-2 text-sm whitespace-pre-wrap",
            isUser &&
              "bg-primary text-primary-foreground rounded-br-sm",
            !isUser &&
              !isSystem &&
              "bg-muted text-foreground rounded-bl-sm",
            isSystem &&
              "bg-muted/50 text-muted-foreground text-xs",
          )}
        >
          {content}
        </div>
      </div>
    </div>
  );
}

export { ChatMessage };
