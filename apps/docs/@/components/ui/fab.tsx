"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const fabVariants = cva(
  "inline-flex items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:shadow-xl active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
        ghost:
          "bg-transparent shadow-none hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "size-14",
        sm: "size-10",
        lg: "size-16",
      },
      position: {
        "bottom-right": "fixed bottom-6 right-6 z-50",
        "bottom-left": "fixed bottom-6 left-6 z-50",
        "top-right": "fixed top-6 right-6 z-50",
        "top-left": "fixed top-6 left-6 z-50",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      position: "bottom-right",
    },
  },
);

interface FabProps
  extends React.ComponentProps<"button">, VariantProps<typeof fabVariants> {}

function Fab({
  className,
  variant,
  size,
  position,
  children,
  ...props
}: FabProps) {
  return (
    <button
      data-slot="fab"
      type="button"
      className={cn(fabVariants({ variant, size, position }), className)}
      {...props}
    >
      {children}
    </button>
  );
}

export { Fab, fabVariants };
