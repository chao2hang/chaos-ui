"use client";

import { cn } from "@/lib/utils";

/**
 * @component ChatModelSwitcher
 * @category business/chat
 * @since 0.7.0
 * @description 模型切换器
 * @keywords chat, model, switcher
 * @example
 * <ChatModelSwitcher />
 */

interface ChatModelSwitcherProps {
  models: Array<{ id: string; name: string; description?: string }>;
  activeId?: string;
  onSwitch?: (id: string) => void;
  className?: string;
}

function ChatModelSwitcher({ className }: ChatModelSwitcherProps) {
  return <div data-slot="chat-model-switcher" className={cn("", className)} />;
}

export { ChatModelSwitcher };
export type { ChatModelSwitcherProps };
