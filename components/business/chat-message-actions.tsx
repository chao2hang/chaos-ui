"use client";

import { cn } from "@/lib/utils";

/**
 * @component ChatMessageActions
 * @category business/chat
 * @since 0.7.0
 * @description 消息操作栏
 * @keywords chat, message, actions
 * @example
 * <ChatMessageActions />
 */

interface ChatMessageActionsProps {
  onReply?: () => void;
  onCopy?: () => void;
  onDelete?: () => void;
  onRegenerate?: () => void;
  className?: string;
}

function ChatMessageActions({ className }: ChatMessageActionsProps) {
  return <div data-slot="chat-message-actions" className={cn("", className)} />;
}

export { ChatMessageActions };
export type { ChatMessageActionsProps };
