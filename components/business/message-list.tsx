"use client";
import { cn } from "@/lib/utils";

/**
 * @component MessageList
 * @category Business
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <MessageList />
 * ```
 * 消息列表(站内信)
 */
export interface MessageListProps {
  className?: string;
}

function MessageList({ className }: MessageListProps) {
  return <div data-slot="message-list" className={cn("", className)} />;
}

export { MessageList };
