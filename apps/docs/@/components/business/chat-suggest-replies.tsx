"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { SparklesIcon } from "@/components/ui/icons";

/**
 * @component ChatSuggestReplies
 * @category business/chat
 * @since 0.7.0
 * @description 建议回复
 * @keywords chat, suggest, replies
 * @example
 * <ChatSuggestReplies suggestions={["Sounds good!", "Tell me more"]} />
 */

interface ChatSuggestRepliesProps {
  suggestions: string[];
  onSelect?: (suggestion: string) => void;
  className?: string;
}

function ChatSuggestReplies({ suggestions, onSelect, className }: ChatSuggestRepliesProps) {
  const handleKeyDown = React.useCallback(
    (s: string) => (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect?.(s);
      }
    },
    [onSelect],
  );

  if (suggestions.length === 0) {
    return <div data-slot="chat-suggest-replies" className={cn("hidden", className)} aria-hidden />;
  }

  return (
    <div
      data-slot="chat-suggest-replies"
      className={cn("flex flex-wrap gap-2", className)}
      aria-label="Suggested replies"
    >
      {suggestions.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onSelect?.(s)}
          onKeyDown={handleKeyDown(s)}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:bg-muted hover:text-foreground"
        >
          <SparklesIcon className="size-3 shrink-0 text-primary" aria-hidden />
          <span className="max-w-[16rem] truncate">{s}</span>
        </button>
      ))}
    </div>
  );
}

export { ChatSuggestReplies };
export type { ChatSuggestRepliesProps };
