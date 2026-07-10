import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/lib/utils";

export type InputProps = React.ComponentProps<"input">;

/**
 * @component Input
 * @category ui/data-entry
 * @since 0.2.0
 * @description A styled text input built on @base-ui/react Input primitive with focus, disabled, and invalid states. Supports ref forwarding for react-hook-form integration. / 基于 @base-ui/react Input 的样式化文本输入框，支持聚焦、禁用和无效状态，支持 ref 转发以兼容 react-hook-form。
 * @keywords input, text-input, form, base-ui, forwardRef, ref
 * @example
 * <Input type="email" placeholder="Enter your email" />
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <InputPrimitive
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(
          "border-input file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 disabled:bg-input/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 h-8 w-full min-w-0 rounded-lg border bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 md:text-sm",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
