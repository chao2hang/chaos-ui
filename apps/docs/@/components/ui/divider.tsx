import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const dividerVariants = cva("shrink-0", {
  variants: {
    orientation: {
      horizontal: "w-full border-t",
      vertical: "h-full border-l",
    },
    variant: {
      default: "border-border",
      muted: "border-muted",
      primary: "border-primary/30",
      dashed: "border-dashed border-border",
    },
    size: {
      default: "",
      sm: "border",
      lg: "border-2",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    variant: "default",
    size: "default",
  },
});

interface DividerProps
  extends
    Omit<
      React.HTMLAttributes<HTMLDivElement>,
      keyof VariantProps<typeof dividerVariants>
    >,
    VariantProps<typeof dividerVariants> {
  /** Optional text in the middle */
  label?: React.ReactNode;
  /** Text alignment */
  labelPosition?: "left" | "center" | "right";
  /** If true, renders as a decorative separator (no semantic role) */
  decorative?: boolean;
}

function Divider({
  className,
  orientation = "horizontal",
  variant,
  size,
  label,
  labelPosition = "center",
  decorative = false,
  ...props
}: DividerProps) {
  if (label && orientation === "horizontal") {
    return (
      <div
        data-slot="divider"
        role={decorative ? "none" : "separator"}
        aria-orientation={orientation ?? undefined}
        className={cn(
          "flex items-center gap-3",
          dividerVariants({ orientation, variant, size }),
          "border-0",
          className,
        )}
        {...props}
      >
        <span
          className={cn(
            "shrink-0 border-t",
            dividerVariants({ orientation: "horizontal", variant, size }),
            labelPosition === "left" ? "w-[5%]" : "flex-1",
          )}
        />
        <span
          data-slot="divider-label"
          className="text-muted-foreground shrink-0 text-sm"
        >
          {label}
        </span>
        <span
          className={cn(
            "shrink-0 border-t",
            dividerVariants({ orientation: "horizontal", variant, size }),
            labelPosition === "right" ? "w-[5%]" : "flex-1",
          )}
        />
      </div>
    );
  }

  return (
    <div
      data-slot="divider"
      role={decorative ? "none" : "separator"}
      aria-orientation={orientation ?? undefined}
      className={cn(dividerVariants({ orientation, variant, size }), className)}
      {...props}
    />
  );
}

export { Divider, dividerVariants };
