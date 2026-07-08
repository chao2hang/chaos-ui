"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const autocompleteVariants = cva("relative", {
  variants: {
    variant: {
      default: "",
      outline: "",
    },
    size: {
      default: "",
      sm: "",
      lg: "",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
});

interface AutocompleteProps
  extends
    Omit<React.ComponentProps<"input">, "size" | "onChange">,
    VariantProps<typeof autocompleteVariants> {
  /** Options to suggest */
  options: string[];
  /** Controlled value */
  value?: string;
  /** Change handler */
  onValueChange?: (value: string | null) => void;
  /** Min chars before showing suggestions */
  minChars?: number;
}

function Autocomplete({
  className,
  variant,
  size,
  options,
  value: controlledValue,
  onValueChange,
  minChars = 1,
  placeholder = "Type to search...",
  disabled,
  ...props
}: AutocompleteProps) {
  const [internalValue, setInternalValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);

  const value = controlledValue ?? internalValue;

  const filteredOptions = React.useMemo(() => {
    if (value.length < minChars) return [];
    const lower = value.toLowerCase();
    return options.filter((opt) => opt.toLowerCase().includes(lower));
  }, [value, options, minChars]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (controlledValue === undefined) setInternalValue(v);
    onValueChange?.(v);
    setIsOpen(v.length >= minChars);
    setActiveIndex(-1);
  };

  const selectOption = (option: string) => {
    if (controlledValue === undefined) setInternalValue(option);
    onValueChange?.(option);
    setIsOpen(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filteredOptions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      selectOption(filteredOptions[activeIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const item = listRef.current.children[activeIndex] as HTMLElement;
      item?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  return (
    <div
      data-slot="autocomplete"
      className={cn(autocompleteVariants({ variant, size }), className)}
    >
      <input
        ref={inputRef}
        type="text"
        role="combobox"
        aria-expanded={isOpen}
        aria-autocomplete="list"
        autoComplete="off"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => value.length >= minChars && setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        )}
        {...props}
      />
      {isOpen && filteredOptions.length > 0 && (
        <ul
          ref={listRef}
          role="listbox"
          className="bg-popover text-popover-foreground absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border p-1 shadow-md"
        >
          {filteredOptions.map((option, i) => (
            <li
              key={option}
              role="option"
              aria-selected={i === activeIndex}
              className={cn(
                "hover:bg-accent hover:text-accent-foreground relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none",
                i === activeIndex && "bg-accent text-accent-foreground",
              )}
              onMouseDown={() => selectOption(option)}
              onMouseEnter={() => setActiveIndex(i)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export { Autocomplete, autocompleteVariants };
