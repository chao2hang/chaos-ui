"use client";

import { cn } from "@/lib/utils";

/**
 * @component ChatCommandMenu
 * @category business/chat
 * @since 0.7.0
 * @description 斜杠命令菜单
 * @keywords chat, command, menu
 * @example
 * <ChatCommandMenu />
 */

interface ChatCommandMenuProps {
  commands: Array<{ id: string; label: string; description?: string }>;
  onSelect?: (id: string) => void;
  className?: string;
}

function ChatCommandMenu({ className }: ChatCommandMenuProps) {
  return <div data-slot="chat-command-menu" className={cn("", className)} />;
}

export { ChatCommandMenu };
export type { ChatCommandMenuProps };
