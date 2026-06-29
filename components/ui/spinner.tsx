import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component Spinner
 * @category ui/primitives
 * @since 0.2.0
 * @description 纯加载指示器 / Pure loading spinner indicator
 * @keywords spinner, loading, indicator, circular
 * @example
 * <Spinner size="md" />
 * <Spinner variant="dots" />
 */

type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";
type SpinnerVariant = "circle" | "dots" | "bars";

const sizeMap: Record<SpinnerSize, string> = {
  xs: "size-3",
  sm: "size-4",
  md: "size-5",
  lg: "size-7",
  xl: "size-9",
};

const borderMap: Record<SpinnerSize, string> = {
  xs: "border",
  sm: "border-2",
  md: "border-2",
  lg: "border-[3px]",
  xl: "border-4",
};

interface SpinnerProps extends React.ComponentProps<"span"> {
  /** Spinner size / 大小 */
  size?: SpinnerSize;
  /** Spinner variant / 变体 */
  variant?: SpinnerVariant;
  /** Spinner color / 颜色 */
  color?: "primary" | "secondary" | "muted" | "destructive" | "current";
  /** Accessible label / 无障碍标签 */
  label?: string;
}

const colorMap: Record<string, string> = {
  primary: "text-primary",
  secondary: "text-secondary-foreground",
  muted: "text-muted-foreground",
  destructive: "text-destructive",
  current: "text-current",
};

function Spinner({
  className,
  size = "md",
  variant = "circle",
  color = "primary",
  label = "Loading",
  ...props
}: SpinnerProps) {
  if (variant === "dots") {
    return (
      <span
        role="status"
        aria-label={label}
        data-slot="spinner"
        data-variant="dots"
        className={cn(
          "inline-flex items-center gap-1",
          colorMap[color],
          className,
        )}
        {...props}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn(
              "animate-bounce rounded-full bg-current",
              sizeMap[size],
            )}
            style={{ animationDelay: `${i * 150}ms`, animationDuration: "1s" }}
          />
        ))}
        <span className="sr-only">{label}</span>
      </span>
    );
  }

  if (variant === "bars") {
    return (
      <span
        role="status"
        aria-label={label}
        data-slot="spinner"
        data-variant="bars"
        className={cn(
          "inline-flex items-end gap-0.5",
          colorMap[color],
          className,
        )}
        {...props}
      >
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="animate-pulse bg-current"
            style={{
              width: "3px",
              height: "100%",
              animationDelay: `${i * 100}ms`,
              animationDuration: "1s",
            }}
          />
        ))}
        <span className="sr-only">{label}</span>
      </span>
    );
  }

  return (
    <span
      role="status"
      aria-label={label}
      data-slot="spinner"
      data-variant="circle"
      className={cn(
        "inline-block animate-spin rounded-full border-current border-t-transparent",
        sizeMap[size],
        borderMap[size],
        colorMap[color],
        className,
      )}
      {...props}
    >
      <span className="sr-only">{label}</span>
    </span>
  );
}

export { Spinner };
export type { SpinnerProps };
