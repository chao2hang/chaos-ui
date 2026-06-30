"use client";

import { cn } from "@/lib/utils";

/**
 * @component ChatVoiceMessage
 * @category business/chat
 * @since 0.7.0
 * @description 语音消息
 * @keywords chat, voice, message
 * @example
 * <ChatVoiceMessage />
 */

interface ChatVoiceMessageProps {
  duration: number;
  src?: string;
  className?: string;
}

function ChatVoiceMessage({ className }: ChatVoiceMessageProps) {
  return <div data-slot="chat-voice-message" className={cn("", className)} />;
}

export { ChatVoiceMessage };
export type { ChatVoiceMessageProps };
