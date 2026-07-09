"use client";
import * as React from "react";

import { cn } from "@chaos_team/chaos-ui/lib";
import { SparklesIcon } from "@chaos_team/chaos-ui/ui-icons";

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

function ChatSuggestReplies({
  suggestions = [],
  onSelect,
  className,
}: ChatSuggestRepliesProps) {
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
    return (
      <div
        data-slot="chat-suggest-replies"
        className={cn("hidden", className)}
        aria-hidden
      />
    );
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
          className="border-border bg-background text-muted-foreground hover:border-primary/40 hover:bg-muted hover:text-foreground inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors"
        >
          <SparklesIcon className="text-primary size-3 shrink-0" aria-hidden />
          <span className="max-w-[16rem] truncate">{s}</span>
        </button>
      ))}
    </div>
  );
}

export { ChatSuggestReplies };
export type { ChatSuggestRepliesProps };
