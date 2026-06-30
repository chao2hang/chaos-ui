"use client";
import { cn } from "@/lib/utils";

/**
 * @component ChatMessage
 * @category UI
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <ChatMessage />
 * ```
 * 消息气泡(增强)
 */
export interface ChatMessageProps {
  className?: string;
}

function ChatMessage({ className }: ChatMessageProps) {
  return <div data-slot="chat-message" className={cn("", className)} />;
}

export { ChatMessage };
