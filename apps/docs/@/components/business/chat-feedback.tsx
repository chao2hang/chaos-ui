"use client";
import * as React from "react";

import { cn } from "@chaos_team/chaos-ui/lib";
import { Button } from "@chaos_team/chaos-ui/ui";
import { ThumbsDownIcon, ThumbsUpIcon } from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component ChatFeedback
 * @category business/chat
 * @since 0.7.0
 * @description 反馈组件（点赞/点踩/评论）
 * @keywords chat, feedback
 * @example
 * <ChatFeedback onLike={() => {}} onDislike={() => {}} />
 */

interface ChatFeedbackProps {
  onLike?: () => void;
  onDislike?: () => void;
  onComment?: (text: string) => void;
  className?: string;
}

function ChatFeedback({ onLike, onDislike, onComment, className }: ChatFeedbackProps) {
  const [voted, setVoted] = React.useState<"up" | "down" | null>(null);
  const [commenting, setCommenting] = React.useState(false);
  const [text, setText] = React.useState("");

  const handleLike = React.useCallback(() => {
    setVoted((v) => (v === "up" ? null : "up"));
    onLike?.();
  }, [onLike]);

  const handleDislike = React.useCallback(() => {
    setVoted((v) => (v === "down" ? null : "down"));
    onDislike?.();
  }, [onDislike]);

  const submitComment = React.useCallback(() => {
    const trimmed = text.trim();
    if (trimmed) onComment?.(trimmed);
    setText("");
    setCommenting(false);
  }, [onComment, text]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        submitComment();
      }
      if (e.key === "Escape") {
        setCommenting(false);
        setText("");
      }
    },
    [submitComment],
  );

  return (
    <div data-slot="chat-feedback" className={cn("flex flex-col gap-1", className)}>
      <div className="flex items-center gap-1">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={handleLike}
          aria-label="Good response"
          aria-pressed={voted === "up"}
        >
          <ThumbsUpIcon className={cn("size-4", voted === "up" && "text-green-600")} aria-hidden />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={handleDislike}
          aria-label="Bad response"
          aria-pressed={voted === "down"}
        >
          <ThumbsDownIcon className={cn("size-4", voted === "down" && "text-red-600")} aria-hidden />
        </Button>
        {onComment ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setCommenting((v) => !v)}
            aria-expanded={commenting}
            aria-label="Add comment"
          >
            Comment
          </Button>
        ) : null}
      </div>
      {commenting ? (
        <div className="flex flex-col gap-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a comment (Cmd/Ctrl+Enter to submit)"
            aria-label="Comment text"
            rows={2}
            className="resize-none rounded-md border border-border bg-background p-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          />
          <div className="flex justify-end gap-1">
            <Button type="button" variant="ghost" size="sm" onClick={() => setCommenting(false)}>
              Cancel
            </Button>
            <Button type="button" size="sm" onClick={submitComment} disabled={text.trim().length === 0}>
              Submit
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export { ChatFeedback };
export type { ChatFeedbackProps };
