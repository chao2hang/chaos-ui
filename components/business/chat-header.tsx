"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component ChatHeader
 * @category business/chat
 * @since 0.7.0
 * @description 对话顶栏
 * @keywords chat, header
 * @example
 * <ChatHeader />
 */

interface ChatHeaderProps {
  title: string;
  subtitle?: string;
  status?: string;
  actions?: React.ReactNode;
  className?: string;
}

function ChatHeader({ className }: ChatHeaderProps) {
  return <div data-slot="chat-header" className={cn("", className)} />;
}

export { ChatHeader };
export type { ChatHeaderProps };
