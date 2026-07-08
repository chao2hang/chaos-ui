"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

/**
 * @component AutoComplete
 * @category ui/input
 * @since 0.5.0
 * @description Auto-complete input with dropdown suggestions.
 * / 自动完成输入框
 * @keywords autocomplete, input, suggest, typeahead
 * @example
 * <AutoComplete
 *   options={[{ value: "apple" }, { value: "banana" }]}
 *   onSearch={(val) => setFiltered(filter(val))}
 * />
 */

interface AutoCompleteOption {
  value: string;
  label?: string;
  disabled?: boolean;
}

interface AutoCompleteProps {
  /** Current value / 当前值 */
  value?: string;
  /** Change callback / 变更回调 */
  onChange?: (value: string) => void;
  /** Options for dropdown / 下拉选项 */
  options: AutoCompleteOption[];
  /** Search callback (for filtering) / 搜索回调 */
  onSearch?: (value: string) => void;
  /** Selection callback / 选中回调 */
  onSelect?: (value: string, option: AutoCompleteOption) => void;
  /** Placeholder / 占位文本 */
  placeholder?: string;
  /** Disabled / 禁用 */
  disabled?: boolean;
  /** Clear on select / 选中后清除 */
  clearOnSelect?: boolean;
  className?: string;
}

function AutoComplete({
  value: controlledValue,
  onChange,
  options,
  onSearch,
  onSelect,
  placeholder = "Type to search...",
  disabled = false,
  clearOnSelect = false,
  className,
}: AutoCompleteProps) {
  const [internalValue, setInternalValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [highlightIndex, setHighlightIndex] = React.useState(-1);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const handleChange = (val: string) => {
    if (!isControlled) setInternalValue(val);
    // Input changes both the value (onChange) and triggers a search (onSearch).
    // Consumers use onSearch to filter options; onChange to track the input value.
    onChange?.(val);
    onSearch?.(val);
    setHighlightIndex(-1);
  };

  const handleSelect = (option: AutoCompleteOption) => {
    if (option.disabled) return;
    const newVal = clearOnSelect ? "" : option.value;
    if (!isControlled) setInternalValue(newVal);
    onChange?.(newVal);
    onSelect?.(option.value, option);
    setOpen(false);
  };

  // Open panel when there is input + options available. Using an effect (instead
  // of deriving open purely from options.length in handleChange) ensures the
  // panel re-opens when controlled options arrive asynchronously after a search.
  React.useEffect(() => {
    if (currentValue.length > 0 && options.length > 0) {
      setOpen(true);
    } else if (options.length === 0) {
      setOpen(false);
    }
  }, [currentValue, options]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open || options.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => Math.min(prev + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && highlightIndex >= 0) {
      e.preventDefault();
      handleSelect(options[highlightIndex]!);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <Popover
      open={open && options.length > 0}
      onOpenChange={setOpen}
      data-slot="autocomplete"
    >
      <PopoverTrigger
        render={
          <Input
            value={currentValue}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
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
              "flex w-full items-center rounded-sm px-2 py-1.5 text-sm outline-none",
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

export { AutoComplete };
export { AutoComplete as Autocomplete };
export type { AutoCompleteProps, AutoCompleteOption };
