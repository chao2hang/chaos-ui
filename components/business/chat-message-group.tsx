"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component ChatMessageGroup
 * @category business/chat
 * @since 0.7.0
 * @description 消息分组
 * @keywords chat, message, group
 * @example
 * <ChatMessageGroup />
 */

interface ChatMessageGroupProps {
  sender: string;
  avatar?: React.ReactNode;
  messages: Array<{ id: string; content: string; time?: string }>;
  className?: string;
}

function ChatMessageGroup({ className }: ChatMessageGroupProps) {
  return <div data-slot="chat-message-group" className={cn("", className)} />;
}

export { ChatMessageGroup };
export type { ChatMessageGroupProps };
