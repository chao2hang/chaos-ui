"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { SendIcon } from "@/components/ui/icons";

/**
 * @component ChatInput
 * @category UI
 * @since 1.0.0-beta.0
 * @description 聊天输入框，支持 Enter 发送、Shift+Enter 换行
 * @example
 * ```tsx
 * <ChatInput value={text} onChange={setText} onSend={handleSend} placeholder="发送消息" />
 * ```
 */
export interface ChatInputProps {
  /** 当前输入值 / current value */
  value?: string;
  /** 值变化回调 / change handler */
  onChange?: (value: string) => void;
  /** 发送回调 / send handler */
  onSend?: () => void;
  /** 占位提示 / placeholder */
  placeholder?: string;
  /** 是否禁用 / disabled */
  disabled?: boolean;
  /** 附加类名 / extra class */
  className?: string;
}

function ChatInput({
  value,
  onChange,
  onSend,
  placeholder,
  disabled,
  className,
}: ChatInputProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!disabled) {
        onSend?.();
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(event.target.value);
  };

  const handleClick = () => {
    if (!disabled) {
      onSend?.();
    }
  };

  return (
    <div
      data-slot="chat-input"
      className={cn(
        "flex items-end gap-2 rounded-lg border border-input bg-background p-2",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
    >
      <label htmlFor="chat-input-field" className="sr-only">
        {placeholder ?? "消息输入"}
      </label>
      <textarea
        id="chat-input-field"
        data-slot="chat-input-field"
        rows={1}
        className="min-h-8 flex-1 resize-none bg-transparent px-1 py-1 text-sm outline-none placeholder:text-muted-foreground"
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button
        type="button"
        data-slot="chat-input-send"
        aria-label="发送"
        className="inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors hover:bg-primary/80 disabled:pointer-events-none disabled:opacity-50"
        disabled={disabled}
        onClick={handleClick}
      >
        <SendIcon />
      </button>
    </div>
  );
}

export { ChatInput };
