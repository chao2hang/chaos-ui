"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component Label
 * @category ui/primitives
 * @since 0.2.0
 * @description A form label using the native <label> element with disabled and peer-disabled state styling / 使用原生 <label> 元素的表单标签，支持禁用和同级禁用状态样式
 * @keywords label, form, accessibility, primitive
 * @example
 * <Label htmlFor="email">Email Address</Label>
 */
function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Label };
