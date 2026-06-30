"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface SegmentedControlOption<T extends string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface SegmentedControlProps<T extends string> {
  options: SegmentedControlOption<T>[];
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
  size?: "sm" | "default" | "lg";
  disabled?: boolean;
  className?: string;
  orientation?: "horizontal" | "vertical";
}

const sizeMap = {
  sm: "h-7 px-2 text-xs",
  default: "h-8 px-3 text-sm",
  lg: "h-9 px-4 text-sm",
} as const;

export function SegmentedControl<T extends string>({
  options,
  value,
  defaultValue,
  onChange,
  size = "default",
  disabled,
  className,
  orientation = "horizontal",
}: SegmentedControlProps<T>) {
  return (
    <ToggleGroup
      data-slot="segmented-control"
      value={value ? [value] : defaultValue ? [defaultValue] : []}
      onValueChange={(v) => {
        if (v.length > 0) onChange?.(v[v.length - 1] as T);
      }}
      orientation={orientation}
      className={cn(
        "inline-flex items-center rounded-md border bg-muted/30 p-0.5",
        orientation === "vertical" && "flex-col items-stretch",
        className,
      )}
    >
      {options.map((opt) => (
        <ToggleGroupItem
          key={opt.value}
          value={opt.value}
          disabled={disabled || opt.disabled}
          className={cn(
            "rounded-sm border-0 bg-transparent shadow-none transition-all data-[pressed]:bg-background data-[pressed]:shadow-xs",
            sizeMap[size],
          )}
        >
          {opt.icon}
          {opt.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
