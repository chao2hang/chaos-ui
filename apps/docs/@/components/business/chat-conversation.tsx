"use client";

import { cn } from "@chaos_team/chaos-ui/lib";
import { ChatMessageBubble } from "./chat-message-bubble";

/**
 * @component ChatConversation
 * @category business/chat
 * @since 0.7.0
 * @description 对话容器（按角色渲染消息气泡，含系统消息与时间）
 * @keywords chat, conversation
 * @example
 * <ChatConversation messages={[{ id: "1", role: "user", content: "Hi" }]} />
 */

interface ChatConversationProps {
  messages: Array<{ id: string; role: string; content: string; time?: string }>;
  className?: string;
}

function ChatConversation({ messages = [], className }: ChatConversationProps) {
  return (
    <div
      data-slot="chat-conversation"
      className={cn("flex flex-col gap-3 px-4 py-4", className)}
      role="log"
      aria-live="polite"
      aria-label="Conversation messages"
    >
      {messages.length === 0 ? (
        <p className="text-muted-foreground py-8 text-center text-sm">
          No messages yet
        </p>
      ) : (
        messages.map((m) => {
          const role = (
            m.role === "user" || m.role === "assistant" || m.role === "system"
              ? m.role
              : "assistant"
          ) as "user" | "assistant" | "system";
          return (
            <ChatMessageBubble
              key={m.id}
              role={role}
              content={m.content}
              {...(m.time !== undefined && { time: m.time })}
            />
          );
        })
      )}
    </div>
  );
}

export { ChatConversation };
export type { ChatConversationProps };
