import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const spinnerVariants = cva("animate-spin", {
  variants: {
    variant: {
      default: "text-primary",
      muted: "text-muted-foreground",
      white: "text-white",
    },
    size: {
      default: "size-5",
      sm: "size-3.5",
      lg: "size-8",
      xl: "size-12",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
});

interface SpinnerProps
  extends React.ComponentProps<"svg">, VariantProps<typeof spinnerVariants> {
  /** Accessible label */
  label?: string;
}

function Spinner({
  className,
  variant,
  size,
  label = "Loading...",
  ...props
}: SpinnerProps) {
  return (
    <svg
      data-slot="spinner"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(spinnerVariants({ variant, size }), className)}
      role="status"
      aria-label={label}
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

export { Spinner, spinnerVariants };
