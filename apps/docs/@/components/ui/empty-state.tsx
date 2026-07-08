import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const emptyStateVariants = cva(
  "flex flex-col items-center justify-center text-center",
  {
    variants: {
      size: {
        default: "gap-4 p-8",
        sm: "gap-2 p-4",
        lg: "gap-6 p-12",
      },
    },
    defaultVariants: { size: "default" },
  },
);

interface EmptyStateProps
  extends
    Omit<
      React.HTMLAttributes<HTMLDivElement>,
      keyof VariantProps<typeof emptyStateVariants> | "title" | "description"
    >,
    VariantProps<typeof emptyStateVariants> {
  /** Icon element */
  icon?: React.ReactNode;
  /** Title text */
  title?: React.ReactNode;
  /** Description text */
  description?: React.ReactNode;
  /** Action element (button, link, etc.) */
  action?: React.ReactNode;
}

function EmptyState({
  className,
  size,
  icon,
  title,
  description,
  action,
  children,
  ...props
}: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      className={cn(emptyStateVariants({ size }), className)}
      role="status"
      {...props}
    >
      {icon && (
        <div data-slot="empty-state-icon" className="text-muted-foreground/50">
          {icon}
        </div>
      )}
      {title && (
        <div
          data-slot="empty-state-title"
          className={cn(
            "text-foreground font-semibold",
            size === "sm" && "text-sm",
            size === "default" && "text-base",
            size === "lg" && "text-lg",
          )}
        >
          {title}
        </div>
      )}
      {description && (
        <div
          data-slot="empty-state-description"
          className={cn(
            "text-muted-foreground max-w-sm",
            size === "sm" && "text-xs",
            size === "default" && "text-sm",
            size === "lg" && "text-base",
          )}
        >
          {description}
        </div>
      )}
      {action && <div data-slot="empty-state-action">{action}</div>}
      {children}
    </div>
  );
}

export { EmptyState, emptyStateVariants };
