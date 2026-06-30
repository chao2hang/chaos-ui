"use client";

import { cn } from "@/lib/utils";

/**
 * @component ChatFeedback
 * @category business/chat
 * @since 0.7.0
 * @description 反馈组件
 * @keywords chat, feedback
 * @example
 * <ChatFeedback />
 */

interface ChatFeedbackProps {
  onLike?: () => void;
  onDislike?: () => void;
  onComment?: (text: string) => void;
  className?: string;
}

function ChatFeedback({ className }: ChatFeedbackProps) {
  return <div data-slot="chat-feedback" className={cn("", className)} />;
}

export { ChatFeedback };
export type { ChatFeedbackProps };
