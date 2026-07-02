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

/**
 * @component FormSection
 * @category ui/data-entry
 * @since 0.2.0
 * @description A collapsible form section with title, description, and variant styling for grouping related form fields / 可折叠的表单分区，带标题、描述和样式变体，用于分组相关表单字段
 * @keywords form, section, collapsible, group, card
 * @example
 * <FormSection title="Basic Info" description="Fill in your details" collapsible>
 *   <Input placeholder="Name" />
 * </FormSection>
 */
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
              <h3 className="text-sm leading-none font-medium">
                {title}
                {required && <span className="text-destructive ml-1">*</span>}
              </h3>
            )}
            {description && (
              <p className="text-muted-foreground text-xs">{description}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {extra}
            {collapsible && (
              <ChevronDownIcon
                className={cn(
                  "text-muted-foreground size-4 transition-transform",
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
