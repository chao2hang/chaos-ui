"use client";

import { cn } from "@/lib/utils";

/**
 * @component ChatSuggestReplies
 * @category business/chat
 * @since 0.7.0
 * @description 建议回复
 * @keywords chat, suggest, replies
 * @example
 * <ChatSuggestReplies />
 */

interface ChatSuggestRepliesProps {
  suggestions: string[];
  onSelect?: (suggestion: string) => void;
  className?: string;
}

function ChatSuggestReplies({ className }: ChatSuggestRepliesProps) {
  return <div data-slot="chat-suggest-replies" className={cn("", className)} />;
}

export { ChatSuggestReplies };
export type { ChatSuggestRepliesProps };
