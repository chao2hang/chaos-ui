"use client";

import { cn } from "@/lib/utils";

/**
 * @component ChatAgentStatus
 * @category business/chat
 * @since 0.7.0
 * @description Agent状态
 * @keywords chat, agent, status
 * @example
 * <ChatAgentStatus />
 */

interface ChatAgentStatusProps {
  status: "idle" | "thinking" | "acting" | "waiting" | "done";
  label?: string;
  className?: string;
}

function ChatAgentStatus({ className }: ChatAgentStatusProps) {
  return <div data-slot="chat-agent-status" className={cn("", className)} />;
}

export { ChatAgentStatus };
export type { ChatAgentStatusProps };
