"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const tagVariants = cva(
  "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive/10 text-destructive hover:bg-destructive/20",
        outline: "border-border text-foreground hover:bg-muted",
        success:
          "border-transparent bg-success/10 text-success hover:bg-success/20",
        warning:
          "border-transparent bg-warning/10 text-warning hover:bg-warning/20",
        info: "border-transparent bg-info/10 text-info hover:bg-info/20",
      },
      size: {
        default: "h-5",
        sm: "h-4 text-[10px] px-1.5",
        lg: "h-6 text-sm px-3",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
        none: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
  },
);

interface TagProps
  extends React.ComponentProps<"span">, VariantProps<typeof tagVariants> {
  /** Whether the tag can be closed/removed */
  closable?: boolean;
  /** Called when close button is clicked */
  onClose?: (e: React.MouseEvent) => void;
  /** Icon element */
  icon?: React.ReactNode;
}

function Tag({
  className,
  variant,
  size,
  rounded,
  closable = false,
  onClose,
  icon,
  children,
  ...props
}: TagProps) {
  return (
    <span
      data-slot="tag"
      className={cn(tagVariants({ variant, size, rounded }), className)}
      {...props}
    >
      {icon && (
        <span data-slot="tag-icon" className="size-3 shrink-0">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {closable && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose?.(e);
          }}
          className="focus-visible:ring-ring ml-0.5 shrink-0 rounded-sm opacity-70 hover:opacity-100 focus-visible:ring-1 focus-visible:outline-none"
          aria-label="Remove"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      )}
    </span>
  );
}

export { Tag, tagVariants };
