"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component ChatInputToolbar
 * @category business/chat
 * @since 0.7.0
 * @description 输入框工具栏
 * @keywords chat, input, toolbar
 * @example
 * <ChatInputToolbar />
 */

interface ChatInputToolbarProps {
  tools: Array<{ id: string; icon?: React.ReactNode; label: string }>;
  onToolClick?: (id: string) => void;
  className?: string;
}

function ChatInputToolbar({ className }: ChatInputToolbarProps) {
  return <div data-slot="chat-input-toolbar" className={cn("", className)} />;
}

export { ChatInputToolbar };
export type { ChatInputToolbarProps };
