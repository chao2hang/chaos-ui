"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { XIcon } from "@/components/ui/icons";

/**
 * @component TagsInput
 * @category ui/data-entry
 * @since 0.2.0
 * @description Multi-value tag input with add/remove via keyboard, comma or Enter / 多值标签输入框，通过键盘、逗号或回车添加/删除标签
 * @keywords tags, input, multi-value, chips, 标签输入
 * @example
 * <TagsInput value={tags} onChange={setTags} placeholder="Add tag..." />
 */
function TagsInput({
  value = [],
  onChange,
  placeholder = "Add tag...",
  max,
  disabled,
  className,
  size = "default",
}: {
  value?: string[];
  onChange?: (v: string[]) => void;
  placeholder?: string;
  max?: number;
  disabled?: boolean;
  className?: string;
  /** Field height: default min-h-8; sm min-h-7 (multi-tag wrap allowed) */
  size?: "sm" | "default";
}) {
  const isSm = size === "sm";
  const [input, setInput] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const addTag = (tag: string): void => {
    const trimmed = tag.trim();
    if (!trimmed) return;
    if (max && value.length >= max) return;
    if (value.includes(trimmed)) return;
    onChange?.([...value, trimmed]);
    setInput("");
  };

  const removeTag = (index: number): void => {
    onChange?.(value.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
    }
    if (e.key === "Backspace" && !input && value.length > 0) {
      removeTag(value.length - 1);
    }
  };

  return (
    <div
      data-slot="tags-input"
      data-size={size}
      className={cn(
        "flex flex-wrap items-center gap-1.5 border bg-transparent px-2 text-sm",
        isSm
          ? "min-h-7 rounded-[min(var(--radius-md),10px)] py-0"
          : "min-h-8 rounded-md py-1",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {value.map((tag, i) => (
        <Badge
          key={i}
          variant="secondary"
          className={cn(
            "gap-1",
            isSm && "h-4 px-1.5 py-0 text-[10px] leading-none",
          )}
        >
          {tag}
          {!disabled && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(i);
              }}
              className="hover:bg-muted-foreground/20 ml-0.5 rounded-full"
            >
              <XIcon className={cn(isSm ? "size-2.5" : "size-3")} />
            </button>
          )}
        </Badge>
      ))}
      <input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={value.length === 0 ? placeholder : ""}
        disabled={disabled || !!(max && value.length >= max)}
        className="placeholder:text-muted-foreground min-w-[80px] flex-1 bg-transparent outline-none disabled:cursor-not-allowed"
      />
    </div>
  );
}

export { TagsInput };
