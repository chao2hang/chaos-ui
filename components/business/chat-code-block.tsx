"use client";

import { cn } from "@/lib/utils";

/**
 * @component ChatCodeBlock
 * @category business/chat
 * @since 0.7.0
 * @description 代码块
 * @keywords chat, code, block
 * @example
 * <ChatCodeBlock />
 */

interface ChatCodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

function ChatCodeBlock({ className }: ChatCodeBlockProps) {
  return <div data-slot="chat-code-block" className={cn("", className)} />;
}

export { ChatCodeBlock };
export type { ChatCodeBlockProps };
