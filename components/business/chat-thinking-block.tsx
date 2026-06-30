"use client";

import { cn } from "@/lib/utils";

/**
 * @component ChatThinkingBlock
 * @category business/chat
 * @since 0.7.0
 * @description AI思考过程展示
 * @keywords chat, thinking, block
 * @example
 * <ChatThinkingBlock />
 */

interface ChatThinkingBlockProps {
  content: string;
  duration?: number;
  collapsed?: boolean;
  className?: string;
}

function ChatThinkingBlock({ className }: ChatThinkingBlockProps) {
  return <div data-slot="chat-thinking-block" className={cn("", className)} />;
}

export { ChatThinkingBlock };
export type { ChatThinkingBlockProps };
