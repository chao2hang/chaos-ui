"use client";

import { cn } from "@/lib/utils";

/**
 * @component ChatMessageInput
 * @category business/chat
 * @since 0.7.0
 * @description 聊天消息输入框
 * @keywords chat, message, input
 * @example
 * <ChatMessageInput />
 */

interface ChatMessageInputProps {
  value?: string;
  onChange?: (val: string) => void;
  onSend?: () => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  className?: string;
}

function ChatMessageInput({ className }: ChatMessageInputProps) {
  return <div data-slot="chat-message-input" className={cn("", className)} />;
}

export { ChatMessageInput };
export type { ChatMessageInputProps };
