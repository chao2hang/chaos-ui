"use client";

import { cn } from "@/lib/utils";

/**
 * @component ChatToolCallBlock
 * @category business/chat
 * @since 0.7.0
 * @description AI工具调用展示
 * @keywords chat, tool, call, block
 * @example
 * <ChatToolCallBlock />
 */

interface ChatToolCallBlockProps {
  toolName: string;
  toolInput?: unknown;
  toolOutput?: unknown;
  status: "calling" | "success" | "error";
  className?: string;
}

function ChatToolCallBlock({ className }: ChatToolCallBlockProps) {
  return <div data-slot="chat-tool-call-block" className={cn("", className)} />;
}

export { ChatToolCallBlock };
export type { ChatToolCallBlockProps };
