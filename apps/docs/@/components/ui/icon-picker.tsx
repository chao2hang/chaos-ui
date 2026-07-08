"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const iconPickerVariants = cva("", {
  variants: {
    size: {
      default: "",
      sm: "",
      lg: "",
    },
  },
  defaultVariants: { size: "default" },
});

interface IconPickerProps
  extends
    Omit<
      React.HTMLAttributes<HTMLDivElement>,
      keyof VariantProps<typeof iconPickerVariants> | "onChange"
    >,
    VariantProps<typeof iconPickerVariants> {
  /** Selected icon value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Icons to display - map of value to React node */
  icons: Record<string, React.ReactNode>;
  /** Columns in the grid */
  columns?: number;
  /** Placeholder when searching */
  searchPlaceholder?: string;
}

function IconPicker({
  className,
  size,
  value,
  onChange,
  icons,
  columns = 6,
  searchPlaceholder = "Search icons...",
  ...props
}: IconPickerProps) {
  const [search, setSearch] = React.useState("");
  const iconEntries = Object.entries(icons);
  const filtered = iconEntries.filter(
    ([key]) => !search || key.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div
      data-slot="icon-picker"
      className={cn(iconPickerVariants({ size }), className)}
      {...props}
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={searchPlaceholder}
        className="border-input placeholder:text-muted-foreground focus-visible:ring-ring mb-3 flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none"
        autoComplete="off"
      />
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {filtered.map(([key, icon]) => (
          <button
            key={key}
            type="button"
            onClick={() => onChange?.(key)}
            className={cn(
              "hover:border-border hover:bg-accent flex aspect-square items-center justify-center rounded-md border border-transparent p-1 transition-colors",
              value === key && "border-primary bg-primary/10 text-primary",
            )}
            title={key}
            aria-label={key}
            aria-pressed={value === key}
          >
            <span className="flex size-8 items-center justify-center text-xl">
              {icon}
            </span>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="text-muted-foreground col-span-full py-8 text-center text-sm">
            No icons found
          </p>
        )}
      </div>
    </div>
  );
}

export { IconPicker, iconPickerVariants };
