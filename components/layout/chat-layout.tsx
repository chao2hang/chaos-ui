"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component ChatLayout
 * @category layout
 * @since 0.7.0
 * @description 对话式布局
 * @keywords chat, layout
 * @example
 * <ChatLayout />
 */

interface ChatLayoutProps {
  sidebar?: React.ReactNode;
  messagesArea?: React.ReactNode;
  inputArea?: React.ReactNode;
  className?: string;
}

function ChatLayout({ className }: ChatLayoutProps) {
  return <div data-slot="chat-layout" className={cn("", className)} />;
}

export { ChatLayout };
export type { ChatLayoutProps };
