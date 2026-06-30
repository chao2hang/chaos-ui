"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component ChatMessageBubble
 * @category business/chat
 * @since 0.7.0
 * @description 消息气泡
 * @keywords chat, message, bubble
 * @example
 * <ChatMessageBubble />
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

function ChatMessageBubble({ className }: ChatMessageBubbleProps) {
  return <div data-slot="chat-message-bubble" className={cn("", className)} />;
}

export { ChatMessageBubble };
export type { ChatMessageBubbleProps };
