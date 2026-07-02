import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const kbdVariants = cva(
  "pointer-events-none inline-flex items-center justify-center gap-0.5 rounded-md border bg-muted font-mono font-medium text-muted-foreground shadow-xs select-none",
  {
    variants: {
      size: {
        sm: "h-5 min-w-5 px-1 text-[0.65rem]",
        default: "h-6 min-w-6 px-1.5 text-xs",
        lg: "h-7 min-w-7 px-2 text-sm",
      },
    },
    defaultVariants: { size: "default" },
  },
);

/**
 * @component Kbd
 * @category ui/primitives
 * @since 0.2.0
 * @description A keyboard key visual using the native <kbd> element with size variants for displaying shortcuts / 使用原生 <kbd> 元素的键盘按键视觉组件，支持尺寸变体，用于显示快捷键
 * @keywords kbd, keyboard, shortcut, key, primitive
 * @example
 * <Kbd size="default">Ctrl</Kbd>
 */
function Kbd({
  className,
  size,
  ...props
}: React.ComponentProps<"kbd"> & VariantProps<typeof kbdVariants>) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(kbdVariants({ size }), className)}
      {...props}
    />
  );
}

/**
 * @component KbdGroup
 * @category ui/primitives
 * @since 0.2.0
 * @description An inline flex container for grouping multiple Kbd elements together as a key combination / 内联 flex 容器，用于将多个 Kbd 元素组合为按键组合
 * @keywords kbd, keyboard, shortcut, group, combination
 * @example
 * <KbdGroup><Kbd>Ctrl</Kbd>+<Kbd>K</Kbd></KbdGroup>
 */
function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  );
}

export { Kbd, KbdGroup, kbdVariants };
