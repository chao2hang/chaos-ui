"use client";

import { cn } from "@/lib/utils";

/**
 * @component ChatSidebar
 * @category business/chat
 * @since 0.7.0
 * @description 会话列表
 * @keywords chat, sidebar
 * @example
 * <ChatSidebar />
 */

interface ChatSidebarProps {
  conversations: Array<{
    id: string;
    title: string;
    unread?: number;
    lastMessage?: string;
    time?: string;
  }>;
  activeId?: string;
  onSelect?: (id: string) => void;
  className?: string;
}

function ChatSidebar({ className }: ChatSidebarProps) {
  return <div data-slot="chat-sidebar" className={cn("", className)} />;
}

export { ChatSidebar };
export type { ChatSidebarProps };
