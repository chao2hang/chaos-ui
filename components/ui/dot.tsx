import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const dotVariants = cva("inline-block rounded-full", {
  variants: {
    size: {
      sm: "size-1.5",
      default: "size-2",
      lg: "size-2.5",
    },
    variant: {
      default: "bg-foreground/40",
      primary: "bg-primary",
      success: "bg-success",
      warning: "bg-warning",
      destructive: "bg-destructive",
      info: "bg-info",
    },
    pulse: {
      true: "relative after:absolute after:inset-0 after:rounded-full after:bg-inherit after:animate-ping after:opacity-75",
      false: "",
    },
  },
  defaultVariants: { size: "default", variant: "default", pulse: false },
});

/**
 * @component Dot
 * @category ui/primitives
 * @since 0.2.0
 * @description Small colored status indicator with size, variant, and optional pulse animation / 小彩色状态指示器，支持尺寸、颜色变体和可选的脉冲动画
 * @keywords dot, indicator, status, badge, pulse
 * @example
 * <Dot variant="success" pulse />
 */
function Dot({
  className,
  size,
  variant,
  pulse,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof dotVariants>) {
  return (
    <span
      data-slot="dot"
      className={cn(dotVariants({ size, variant, pulse }), className)}
      {...props}
    />
  );
}

export { Dot, dotVariants };
