"use client";

import { cn } from "@/lib/utils";

/**
 * @component ChatContextPanel
 * @category business/chat
 * @since 0.7.0
 * @description 上下文面板
 * @keywords chat, context, panel
 * @example
 * <ChatContextPanel />
 */

interface ChatContextPanelProps {
  context: Array<{ label: string; value: string }>;
  className?: string;
}

function ChatContextPanel({ className }: ChatContextPanelProps) {
  return <div data-slot="chat-context-panel" className={cn("", className)} />;
}

export { ChatContextPanel };
export type { ChatContextPanelProps };
