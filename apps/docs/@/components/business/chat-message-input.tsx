"use client";
import * as React from "react";

import { cn } from "@chaos_team/chaos-ui/lib";
import { Button } from "@chaos_team/chaos-ui/ui";
import { SendIcon } from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component ChatMessageInput
 * @category business/chat
 * @since 0.7.0
 * @description 聊天消息输入框（自适应高度，Enter 发送，Shift+Enter 换行）
 * @keywords chat, message, input
 * @example
 * <ChatMessageInput placeholder="Send a message..." />
 */

interface ChatMessageInputProps {
  value?: string;
  onChange?: (val: string) => void;
  onSend?: () => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  className?: string;
}

function ChatMessageInput({
  value,
  onChange,
  onSend,
  placeholder = "Type a message...",
  disabled = false,
  maxLength,
  className,
}: ChatMessageInputProps) {
  const [internal, setInternal] = React.useState("");
  const controlled = value !== undefined;
  const current = controlled ? value : internal;

  const ref = React.useRef<HTMLTextAreaElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, [current]);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const next = maxLength !== undefined ? e.target.value.slice(0, maxLength) : e.target.value;
      if (!controlled) setInternal(next);
      onChange?.(next);
    },
    [controlled, maxLength, onChange],
  );

  const handleSend = React.useCallback(() => {
    if (disabled) return;
    if (!current.trim()) return;
    onSend?.();
    if (!controlled) setInternal("");
  }, [controlled, current, disabled, onSend]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  const remaining = maxLength !== undefined ? maxLength - current.length : undefined;

  return (
    <div
      data-slot="chat-message-input"
      className={cn(
        "flex items-end gap-2 rounded-xl border border-border bg-background p-2 focus-within:ring-2 focus-within:ring-ring/40",
        disabled && "opacity-60",
        className,
      )}
    >
      <textarea
        ref={ref}
        rows={1}
        value={current}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        aria-label="Message"
        className="max-h-[200px] min-h-[1.5rem] flex-1 resize-none bg-transparent px-1 py-1 text-sm outline-none placeholder:text-muted-foreground"
      />
      <div className="flex shrink-0 flex-col items-end gap-0.5">
        {remaining !== undefined ? (
          <span className={cn("text-[0.65rem] tabular-nums", remaining < 10 && "text-destructive")} aria-live="polite">
            {remaining}
          </span>
        ) : null}
        <Button
          type="button"
          size="icon-sm"
          onClick={handleSend}
          disabled={disabled || current.trim().length === 0}
          aria-label="Send message"
        >
          <SendIcon className="size-4" aria-hidden />
        </Button>
      </div>
    </div>
  );
}

export { ChatMessageInput };
export type { ChatMessageInputProps };
