"use client";
import * as React from "react";

import { cn } from "@chaos_team/chaos-ui/lib";
import { BrainIcon, ChevronRightIcon } from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component ChatThinkingBlock
 * @category business/chat
 * @since 0.7.0
 * @description AI思考过程展示（可折叠）
 * @keywords chat, thinking, block
 * @example
 * <ChatThinkingBlock content="Considering options..." duration={1200} />
 */

interface ChatThinkingBlockProps {
  content: string;
  duration?: number;
  collapsed?: boolean;
  className?: string;
}

function formatMs(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

function ChatThinkingBlock({
  content,
  duration,
  collapsed = false,
  className,
}: ChatThinkingBlockProps) {
  const [open, setOpen] = React.useState(!collapsed);

  return (
    <div
      data-slot="chat-thinking-block"
      className={cn("border-border bg-muted/30 rounded-lg border", className)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="text-muted-foreground hover:bg-muted/50 flex w-full items-center gap-1.5 px-3 py-2 text-xs font-medium"
      >
        <ChevronRightIcon
          className={cn("size-3.5 transition-transform", open && "rotate-90")}
          aria-hidden
        />
        <BrainIcon className="size-3.5 text-purple-500" aria-hidden />
        <span>Thought process</span>
        {duration !== undefined ? (
          <span className="ml-auto tabular-nums">{formatMs(duration)}</span>
        ) : null}
      </button>
      {open ? (
        <div className="border-border border-t px-3 py-2">
          <p className="text-muted-foreground text-xs leading-relaxed break-words whitespace-pre-wrap">
            {content}
          </p>
        </div>
      ) : null}
    </div>
  );
}

export { ChatThinkingBlock };
export type { ChatThinkingBlockProps };
