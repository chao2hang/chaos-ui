"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

/**
 * @component Mentions
 * @category ui/input
 * @since 0.5.0
 * @description @mention input — triggers a dropdown when typing @.
 * / @提及输入框，输入@时弹出候选列表
 * @keywords mentions, at, mention, tag, textarea
 * @example
 * <Mentions
 *   options={[{ value: "alice", label: "Alice Wang" }]}
 *   onSearch={(val) => setFiltered(filter(val))}
 * />
 */

interface MentionOption {
  value: string;
  label?: string;
  avatar?: string;
  disabled?: boolean;
}

interface MentionsProps {
  value?: string;
  onChange?: (value: string) => void;
  /** Mention options / 提及选项 */
  options: MentionOption[];
  /** Trigger character / 触发字符 */
  trigger?: string;
  /** Search callback / 搜索回调 */
  onSearch?: (value: string) => void;
  /** Selection callback / 选中回调 */
  onSelect?: (value: string, option: MentionOption) => void;
  /** Placeholder / 占位文本 */
  placeholder?: string;
  /** Rows / 行数 */
  rows?: number;
  disabled?: boolean;
  className?: string;
}

function Mentions({
  value: controlledValue,
  onChange,
  options,
  trigger = "@",
  onSearch,
  onSelect,
  placeholder = "Type @ to mention someone...",
  rows = 3,
  disabled = false,
  className,
}: MentionsProps) {
  const [internalValue, setInternalValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [highlightIndex, setHighlightIndex] = React.useState(-1);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  // Detect trigger character and extract search text after it
  const handleChange = (val: string) => {
    if (!isControlled) setInternalValue(val);
    onChange?.(val);

    // Check if the cursor is near a trigger
    const lastTriggerIdx = val.lastIndexOf(trigger);
    if (lastTriggerIdx !== -1) {
      const afterTrigger = val.substring(lastTriggerIdx + 1);
      const hasSpace = afterTrigger.includes(" ");
      if (!hasSpace) {
        onSearch?.(afterTrigger);
        setOpen(options.length > 0);
        setHighlightIndex(-1);
        return;
      }
    }
    setOpen(false);
  };

  const handleSelect = (option: MentionOption) => {
    if (option.disabled) return;
    const lastTriggerIdx = currentValue.lastIndexOf(trigger);
    if (lastTriggerIdx === -1) return;

    const beforeTrigger = currentValue.substring(0, lastTriggerIdx);
    const newVal = `${beforeTrigger}${trigger}${option.value} `;
    if (!isControlled) setInternalValue(newVal);
    onChange?.(newVal);
    onSelect?.(option.value, option);
    setOpen(false);
  };

  return (
    <Popover
      open={open && options.length > 0}
      onOpenChange={setOpen}
      data-slot="mentions"
    >
      <PopoverTrigger
        render={
          <Textarea
            value={currentValue}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            disabled={disabled}
            className={className}
          />
        }
      />
      <PopoverContent
        align="start"
        className="w-[var(--anchor-width,100%)] p-1"
      >
        {options.map((option, idx) => (
          <button
            key={option.value}
            type="button"
            disabled={option.disabled}
            className={cn(
              "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none",
              idx === highlightIndex && "bg-accent",
              option.disabled && "pointer-events-none opacity-50",
            )}
            onClick={() => handleSelect(option)}
            onMouseEnter={() => setHighlightIndex(idx)}
          >
            {option.label ?? option.value}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

export { Mentions };
export type { MentionsProps, MentionOption };
