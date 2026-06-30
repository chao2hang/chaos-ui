"use client";

import { cn } from "@/lib/utils";

/**
 * @component ChatStreamingText
 * @category business/chat
 * @since 0.7.0
 * @description 流式文本输出
 * @keywords chat, streaming, text
 * @example
 * <ChatStreamingText />
 */

interface ChatStreamingTextProps {
  chunks: string[];
  isStreaming?: boolean;
  speed?: number;
  className?: string;
}

function ChatStreamingText({ className }: ChatStreamingTextProps) {
  return <div data-slot="chat-streaming-text" className={cn("", className)} />;
}

export { ChatStreamingText };
export type { ChatStreamingTextProps };
