"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const segmentedControlVariants = cva(
  "inline-flex rounded-md bg-muted p-1 text-muted-foreground",
  {
    variants: {
      size: {
        default: "h-9",
        sm: "h-8 text-xs",
        lg: "h-10 text-base",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: { size: "default", fullWidth: false },
  },
);

interface SegmentedControlOption {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
}

interface SegmentedControlProps
  extends
    Omit<React.ComponentProps<"div">, "onChange">,
    VariantProps<typeof segmentedControlVariants> {
  options: SegmentedControlOption[];
  value?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
}

function SegmentedControl({
  className,
  size,
  fullWidth,
  options,
  value: controlledValue,
  onChange,
  defaultValue,
  ...props
}: SegmentedControlProps) {
  const [internalValue, setInternalValue] = React.useState(
    defaultValue ?? options[0]?.value ?? "",
  );
  const value = controlledValue ?? internalValue;

  const handleChange = (newValue: string) => {
    if (controlledValue === undefined) setInternalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div
      data-slot="segmented-control"
      className={cn(segmentedControlVariants({ size, fullWidth }), className)}
      role="radiogroup"
      {...props}
    >
      {options.map((option) => {
        const isSelected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={option.disabled}
            onClick={() => !option.disabled && handleChange(option.value)}
            className={cn(
              "focus-visible:ring-ring relative flex items-center justify-center rounded-sm px-3 py-1 text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
              fullWidth && "flex-1",
              isSelected &&
                "bg-background text-foreground ring-border/50 shadow-sm ring-1",
              !isSelected && "hover:text-foreground",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export { SegmentedControl, segmentedControlVariants };
