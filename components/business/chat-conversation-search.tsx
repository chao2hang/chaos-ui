"use client";

import { cn } from "@/lib/utils";

/**
 * @component ChatConversationSearch
 * @category business/chat
 * @since 0.7.0
 * @description 对话搜索
 * @keywords chat, conversation, search
 * @example
 * <ChatConversationSearch />
 */

interface ChatConversationSearchProps {
  query: string;
  onQueryChange?: (q: string) => void;
  results?: Array<{ id: string; title: string; snippet: string }>;
  className?: string;
}

function ChatConversationSearch({ className }: ChatConversationSearchProps) {
  return (
    <div data-slot="chat-conversation-search" className={cn("", className)} />
  );
}

export { ChatConversationSearch };
export type { ChatConversationSearchProps };
