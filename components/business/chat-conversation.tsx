"use client";

import { cn } from "@/lib/utils";

/**
 * @component ChatConversation
 * @category business/chat
 * @since 0.7.0
 * @description 对话容器
 * @keywords chat, conversation
 * @example
 * <ChatConversation />
 */

interface ChatConversationProps {
  messages: Array<{ id: string; role: string; content: string; time?: string }>;
  className?: string;
}

function ChatConversation({ className }: ChatConversationProps) {
  return <div data-slot="chat-conversation" className={cn("", className)} />;
}

export { ChatConversation };
export type { ChatConversationProps };
