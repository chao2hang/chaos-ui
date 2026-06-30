"use client";
import { cn } from "@/lib/utils";

/**
 * @component ChatInput
 * @category UI
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <ChatInput />
 * ```
 * 聊天输入框
 */
export interface ChatInputProps {
  className?: string;
}

function ChatInput({ className }: ChatInputProps) {
  return <div data-slot="chat-input" className={cn("", className)} />;
}

export { ChatInput };
