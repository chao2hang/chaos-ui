"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDownIcon } from "@/components/ui/icons";

const formSectionVariants = cva(
  "rounded-lg border bg-card text-card-foreground",
  {
    variants: {
      variant: {
        default: "",
        elevated: "shadow-sm",
        flat: "border-0 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface FormSectionProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formSectionVariants> {
  title?: string;
  description?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  required?: boolean;
  extra?: React.ReactNode;
}

function FormSection({
  className,
  variant,
  title,
  description,
  collapsible = false,
  defaultCollapsed = false,
  required,
  extra,
  children,
  ...props
}: FormSectionProps) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);

  return (
    <div
      data-slot="form-section"
      data-collapsed={collapsed}
      className={cn(formSectionVariants({ variant, className }))}
      {...props}
    >
      {(title || description) && (
        <div
          className={cn(
            "flex items-center justify-between px-4 py-3",
            collapsible && "cursor-pointer select-none",
          )}
          onClick={() => collapsible && setCollapsed(!collapsed)}
        >
          <div className="space-y-0.5">
            {title && (
              <h3 className="text-sm font-medium leading-none">
                {title}
                {required && <span className="text-destructive ml-1">*</span>}
              </h3>
            )}
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {extra}
            {collapsible && (
              <ChevronDownIcon
                className={cn(
                  "size-4 text-muted-foreground transition-transform",
                  collapsed && "-rotate-90",
                )}
              />
            )}
          </div>
        </div>
      )}
      {(!collapsible || !collapsed) && (
        <div
          className={cn("px-4 pb-4", title || description ? "pt-0" : "pt-4")}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export { FormSection, formSectionVariants };
export type { FormSectionProps };
