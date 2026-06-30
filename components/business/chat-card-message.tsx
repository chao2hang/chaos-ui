"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component ChatCardMessage
 * @category business/chat
 * @since 0.7.0
 * @description 卡片消息
 * @keywords chat, card, message
 * @example
 * <ChatCardMessage />
 */

interface ChatCardMessageProps {
  title: string;
  description?: string;
  thumbnail?: string;
  metadata?: Array<{ label: string; value: string }>;
  actions?: React.ReactNode;
  className?: string;
}

function ChatCardMessage({ className }: ChatCardMessageProps) {
  return <div data-slot="chat-card-message" className={cn("", className)} />;
}

export { ChatCardMessage };
export type { ChatCardMessageProps };
