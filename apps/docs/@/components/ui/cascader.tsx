"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const cascaderVariants = cva("relative inline-block", {
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

interface CascaderOption {
  label: string;
  value: string;
  children?: CascaderOption[];
  disabled?: boolean;
}

interface CascaderProps
  extends
    Omit<React.ComponentProps<"div">, "onChange">,
    VariantProps<typeof cascaderVariants> {
  options: CascaderOption[];
  value?: string[];
  onChange?: (value: string[], selectedOptions: CascaderOption[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

function Cascader({
  className,
  variant,
  size,
  options,
  value = [],
  onChange,
  placeholder = "Please select",
  disabled,
  ...props
}: CascaderProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activePath, setActivePath] = React.useState<string[]>(value);
  const [hoveredColumn, setHoveredColumn] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);

  const displayText =
    activePath.length > 0
      ? getLabels(options, activePath).join(" / ")
      : placeholder;

  const columns = buildColumns(options, activePath);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: CascaderOption, columnIndex: number) => {
    if (option.disabled) return;
    const newPath = [...activePath.slice(0, columnIndex), option.value];

    if (option.children && option.children.length > 0) {
      setActivePath(newPath);
      setHoveredColumn(columnIndex + 1);
    } else {
      setActivePath(newPath);
      setIsOpen(false);
      onChange?.(newPath, getOptionObjects(options, newPath));
    }
  };

  return (
    <div
      ref={ref}
      data-slot="cascader"
      className={cn(cascaderVariants({ variant, size }), className)}
      {...props}
    >
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "border-input hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring flex h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          activePath.length === 0 && "text-muted-foreground",
          className,
        )}
      >
        <span className="truncate">{displayText}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            "ml-2 shrink-0 transition-transform",
            isOpen && "rotate-180",
          )}
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div className="bg-popover absolute z-50 mt-1 flex rounded-md border shadow-md">
          {columns.map((col, colIndex) => (
            <ul
              key={colIndex}
              className="max-h-60 min-w-[140px] overflow-auto p-1"
            >
              {col.map((option) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={activePath[colIndex] === option.value}
                  aria-disabled={option.disabled}
                  className={cn(
                    "hover:bg-accent hover:text-accent-foreground relative flex cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none select-none",
                    activePath[colIndex] === option.value &&
                      "bg-accent text-accent-foreground",
                    option.disabled && "pointer-events-none opacity-50",
                  )}
                  onClick={() => handleSelect(option, colIndex)}
                  onMouseEnter={() => {
                    const newPath = [
                      ...activePath.slice(0, colIndex),
                      option.value,
                    ];
                    setActivePath(newPath);
                    setHoveredColumn(colIndex);
                  }}
                >
                  {option.label}
                  {option.children && option.children.length > 0 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2 shrink-0"
                      aria-hidden="true"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  )}
                </li>
              ))}
            </ul>
          ))}
        </div>
      )}
    </div>
  );
}

function getLabels(options: CascaderOption[], path: string[]): string[] {
  const result: string[] = [];
  let current = options;
  for (const val of path) {
    const found = current.find((o) => o.value === val);
    if (found) {
      result.push(found.label);
      current = found.children ?? [];
    }
  }
  return result;
}

function getOptionObjects(
  options: CascaderOption[],
  path: string[],
): CascaderOption[] {
  const result: CascaderOption[] = [];
  let current = options;
  for (const val of path) {
    const found = current.find((o) => o.value === val);
    if (found) {
      result.push(found);
      current = found.children ?? [];
    }
  }
  return result;
}

function buildColumns(
  options: CascaderOption[],
  path: string[],
): CascaderOption[][] {
  const columns: CascaderOption[][] = [options];
  let current = options;
  for (const val of path) {
    const found = current.find((o) => o.value === val);
    if (found?.children && found.children.length > 0) {
      columns.push(found.children);
      current = found.children;
    } else {
      break;
    }
  }
  return columns;
}

export { Cascader, cascaderVariants };
