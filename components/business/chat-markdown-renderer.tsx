"use client";

import { cn } from "@/lib/utils";

/**
 * @component ChatMarkdownRenderer
 * @category business/chat
 * @since 0.7.0
 * @description Markdown渲染器
 * @keywords chat, markdown, renderer
 * @example
 * <ChatMarkdownRenderer />
 */

interface ChatMarkdownRendererProps {
  content: string;
  className?: string;
}

function ChatMarkdownRenderer({ className }: ChatMarkdownRendererProps) {
  return (
    <div data-slot="chat-markdown-renderer" className={cn("", className)} />
  );
}

export { ChatMarkdownRenderer };
export type { ChatMarkdownRendererProps };
