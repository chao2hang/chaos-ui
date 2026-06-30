"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component ChatShell
 * @category business/chat
 * @since 0.7.0
 * @description 聊天页面骨架
 * @keywords chat, shell
 * @example
 * <ChatShell />
 */

interface ChatShellProps {
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  children?: React.ReactNode;
  detailPanel?: React.ReactNode;
  className?: string;
}

function ChatShell({ className }: ChatShellProps) {
  return <div data-slot="chat-shell" className={cn("", className)} />;
}

export { ChatShell };
export type { ChatShellProps };
