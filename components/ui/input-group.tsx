"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input, type InputProps } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/**
 * @component InputGroup
 * @category ui/data-entry
 * @since 0.2.0
 * @description A composite input container that groups addons, buttons, and text with an input field in a single visual unit / 复合输入容器，将附加组件、按钮和文本与输入字段组合成一个视觉整体
 * @keywords input, group, addon, composite, field
 * @example
 * <InputGroup><InputGroupAddon>$</InputGroupAddon><InputGroupInput placeholder="Amount" /></InputGroup>
 */
function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group border-input has-disabled:bg-input/50 has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-destructive/20 dark:bg-input/30 dark:has-disabled:bg-input/80 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 relative flex h-8 w-full min-w-0 items-center rounded-lg border transition-colors outline-none in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-disabled:opacity-50 has-[[data-slot=input-group-control]:focus-visible]:ring-3 has-[[data-slot][aria-invalid=true]]:ring-3 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5",
        className,
      )}
      {...props}
    />
  );
}

const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        "inline-start":
          "order-first pl-2 has-[>button]:ml-[-0.3rem] has-[>kbd]:ml-[-0.15rem]",
        "inline-end":
          "order-last pr-2 has-[>button]:mr-[-0.3rem] has-[>kbd]:mr-[-0.15rem]",
        "block-start":
          "order-first w-full justify-start px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2",
        "block-end":
          "order-last w-full justify-start px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  },
);

/**
 * @component InputGroupAddon
 * @category ui/data-entry
 * @since 0.2.0
 * @description A prefix or suffix addon for InputGroup that can contain text, icons, kbd, or buttons with click-to-focus behavior / InputGroup 的前缀或后缀附加组件，可包含文本、图标、键盘快捷键或按钮，支持点击聚焦行为
 * @keywords input, group, addon, prefix, suffix
 * @example
 * <InputGroupAddon align="inline-start">@</InputGroupAddon>
 */
function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return;
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus();
      }}
      {...props}
    />
  );
}

const inputGroupButtonVariants = cva(
  "flex items-center gap-2 text-sm shadow-none",
  {
    variants: {
      size: {
        xs: "h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
        sm: "",
        "icon-xs":
          "size-6 rounded-[calc(var(--radius)-3px)] p-0 has-[>svg]:p-0",
        "icon-sm": "size-8 p-0 has-[>svg]:p-0",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  },
);

/**
 * @component InputGroupButton
 * @category ui/data-entry
 * @since 0.2.0
 * @description A button styled for use inside InputGroup with compact sizing variants / 用于 InputGroup 内部的按钮，支持紧凑尺寸变体
 * @keywords input, group, button, action, compact
 * @example
 * <InputGroupButton size="icon-xs"><SearchIcon /></InputGroupButton>
 */
function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size" | "type"> &
  VariantProps<typeof inputGroupButtonVariants> & {
    type?: "button" | "submit" | "reset";
  }) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  );
}

/**
 * @component InputGroupText
 * @category ui/data-entry
 * @since 0.2.0
 * @description A text span styled for inline use within InputGroup, typically for labels or descriptions / 用于 InputGroup 内部的文本 span，通常用于标签或描述
 * @keywords input, group, text, label, inline
 * @example
 * <InputGroupText>https://</InputGroupText>
 */
function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "text-muted-foreground flex items-center gap-2 text-sm [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

/**
 * @component InputGroupInput
 * @category ui/data-entry
 * @since 0.2.0
 * @description An Input variant that strips borders and shadows for seamless use inside InputGroup. Uses forwardRef to support ref forwarding for react-hook-form field registration. / 去除边框和阴影的 Input 变体，用于在 InputGroup 内无缝使用，支持 forwardRef 以兼容 react-hook-form。
 * @keywords input, group, borderless, seamless, forwardRef, ref
 * @example
 * <InputGroupInput ref={ref} placeholder="Search..." />
 */
const InputGroupInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size = "default", ...props }, ref) => {
    return (
      <Input
        ref={ref}
        size={size}
        data-slot="input-group-control"
        className={cn(
          "flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent",
          className,
        )}
        {...props}
      />
    );
  },
);
InputGroupInput.displayName = "InputGroupInput";

/**
 * @component InputGroupTextarea
 * @category ui/data-entry
 * @since 0.2.0
 * @description A Textarea variant that strips borders and shadows for seamless use inside InputGroup. Uses forwardRef to support ref forwarding for react-hook-form field registration. / 去除边框和阴影的 Textarea 变体，用于在 InputGroup 内无缝使用，支持 forwardRef 以兼容 react-hook-form。
 * @keywords input, group, textarea, borderless, seamless, forwardRef, ref
 * @example
 * <InputGroupTextarea ref={ref} placeholder="Enter description..." />
 */
const InputGroupTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <Textarea
      ref={ref}
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent py-2 shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent",
        className,
      )}
      {...props}
    />
  );
});
InputGroupTextarea.displayName = "InputGroupTextarea";

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
};
