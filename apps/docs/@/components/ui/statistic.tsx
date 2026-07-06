import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const statisticVariants = cva("", {
  variants: {
    size: {
      default: "",
      sm: "",
      lg: "",
    },
  },
  defaultVariants: { size: "default" },
});

interface StatisticProps
  extends React.ComponentProps<"div">, VariantProps<typeof statisticVariants> {
  /** The value to display */
  value: React.ReactNode;
  /** Label / title */
  title?: React.ReactNode;
  /** Prefix before value */
  prefix?: React.ReactNode;
  /** Suffix after value */
  suffix?: React.ReactNode;
  /** Precision for number formatting */
  precision?: number;
  /** Loading state shows skeleton */
  loading?: boolean;
}

function Statistic({
  className,
  size,
  value,
  title,
  prefix,
  suffix,
  precision,
  loading = false,
  ...props
}: StatisticProps) {
  const formattedValue = React.useMemo(() => {
    if (typeof value === "number" && precision !== undefined) {
      return value.toFixed(precision);
    }
    return value;
  }, [value, precision]);

  return (
    <div
      data-slot="statistic"
      className={cn(statisticVariants({ size }), className)}
      {...props}
    >
      {title && (
        <div
          data-slot="statistic-title"
          className={cn(
            "text-muted-foreground",
            size === "sm" && "text-xs",
            size === "default" && "text-sm",
            size === "lg" && "text-base",
          )}
        >
          {title}
        </div>
      )}
      <div
        data-slot="statistic-value"
        className={cn(
          "flex items-baseline gap-1 font-mono tabular-nums",
          size === "sm" && "text-lg",
          size === "default" && "text-2xl",
          size === "lg" && "text-4xl",
          loading && "bg-muted animate-pulse rounded text-transparent",
        )}
      >
        {!loading && prefix && (
          <span className="text-muted-foreground text-sm">{prefix}</span>
        )}
        {loading ? "\u00A0\u00A0\u00A0\u00A0" : formattedValue}
        {!loading && suffix && (
          <span className="text-muted-foreground text-sm">{suffix}</span>
        )}
      </div>
    </div>
  );
}

export { Statistic, statisticVariants };
