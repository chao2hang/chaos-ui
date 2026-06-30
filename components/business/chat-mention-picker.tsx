"use client";

import { cn } from "@/lib/utils";

/**
 * @component ChatMentionPicker
 * @category business/chat
 * @since 0.7.0
 * @description @提及选择器
 * @keywords chat, mention, picker
 * @example
 * <ChatMentionPicker />
 */

interface ChatMentionPickerProps {
  users: Array<{ id: string; name: string; avatar?: string }>;
  onSelect?: (id: string) => void;
  className?: string;
}

function ChatMentionPicker({ className }: ChatMentionPickerProps) {
  return <div data-slot="chat-mention-picker" className={cn("", className)} />;
}

export { ChatMentionPicker };
export type { ChatMentionPickerProps };
