import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/lib/utils";

export type InputProps = Omit<React.ComponentProps<"input">, "size"> & {
  /** Field height: default h-8; sm h-7 (aligns with Button/SelectTrigger sm). Omits native HTML size attribute. */
  size?: "sm" | "default";
};

/**
 * @component Input
 * @category ui/data-entry
 * @since 0.2.0
 * @description A styled text input built on @base-ui/react Input primitive with focus, disabled, and invalid states. Supports ref forwarding for react-hook-form integration. / 基于 @base-ui/react Input 的样式化文本输入框，支持聚焦、禁用和无效状态，支持 ref 转发以兼容 react-hook-form。
 * @keywords input, text-input, form, base-ui, forwardRef, ref
 * @example
 * <Input type="email" placeholder="Enter your email" />
 * <Input size="sm" placeholder="Compact" />
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size = "default", ...props }, ref) => {
    const isSm = size === "sm";
    return (
      <InputPrimitive
        ref={ref}
        type={type}
        data-slot="input"
        data-size={size}
        className={cn(
          "border-input file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 disabled:bg-input/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 w-full min-w-0 border bg-transparent px-2.5 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 md:text-sm",
          isSm
            ? "h-7 rounded-[min(var(--radius-md),10px)] py-0"
            : "h-8 rounded-lg py-1",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
