"use client";
import * as React from "react";

import { cn } from "@chaos_team/chaos-ui/lib";
import { BrainIcon, CheckCircle2Icon, Loader2Icon, ZapIcon } from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component ChatAgentStatus
 * @category business/chat
 * @since 0.7.0
 * @description Agent 状态指示器
 * @keywords chat, agent, status
 * @example
 * <ChatAgentStatus status="thinking" />
 */

interface ChatAgentStatusProps {
  status: "idle" | "thinking" | "acting" | "waiting" | "done";
  label?: string;
  className?: string;
}

const STATUS_CONFIG: Record<
  ChatAgentStatusProps["status"],
  { label: string; dot: string; text: string; spin: boolean; Icon: React.ComponentType<{ className?: string }> }
> = {
  idle: { label: "Idle", dot: "bg-muted-foreground", text: "text-muted-foreground", spin: false, Icon: CheckCircle2Icon },
  thinking: { label: "Thinking", dot: "bg-blue-500", text: "text-blue-600 dark:text-blue-400", spin: true, Icon: BrainIcon },
  acting: { label: "Acting", dot: "bg-amber-500", text: "text-amber-600 dark:text-amber-400", spin: true, Icon: ZapIcon },
  waiting: { label: "Waiting", dot: "bg-purple-500", text: "text-purple-600 dark:text-purple-400", spin: true, Icon: Loader2Icon },
  done: { label: "Done", dot: "bg-green-500", text: "text-green-600 dark:text-green-400", spin: false, Icon: CheckCircle2Icon },
};

function ChatAgentStatus({ status, label, className }: ChatAgentStatusProps) {
  const cfg = STATUS_CONFIG[status];
  const text = label ?? cfg.label;
  const Icon = cfg.Icon;
  return (
    <span
      data-slot="chat-agent-status"
      role="status"
      aria-label={`Agent status: ${text}`}
      className={cn("inline-flex items-center gap-1.5 text-xs font-medium", cfg.text, className)}
    >
      <Icon className={cn("size-3.5", cfg.spin && "animate-spin")} aria-hidden />
      <span className={cn("size-2 rounded-full", cfg.dot)} aria-hidden />
      {text}
    </span>
  );
}

export { ChatAgentStatus };
export type { ChatAgentStatusProps };
