"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const numberTickerVariants = cva("tabular-nums font-mono", {
  variants: {
    variant: {
      default: "text-foreground",
      primary: "text-primary",
      success: "text-success",
      warning: "text-warning",
      destructive: "text-destructive",
    },
    size: {
      default: "text-2xl",
      sm: "text-lg",
      lg: "text-4xl",
      xl: "text-6xl",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
});

interface NumberTickerProps
  extends
    React.ComponentProps<"span">,
    VariantProps<typeof numberTickerVariants> {
  /** Target value */
  value: number;
  /** Duration of animation in ms */
  duration?: number;
  /** Decimal places to show */
  decimals?: number;
  /** Prefix text */
  prefix?: string;
  /** Suffix text */
  suffix?: string;
  /** Use easing instead of linear */
  easing?: boolean;
}

function NumberTicker({
  className,
  variant,
  size,
  value,
  duration = 1000,
  decimals = 0,
  prefix,
  suffix,
  easing = true,
  ...props
}: NumberTickerProps) {
  const [displayValue, setDisplayValue] = React.useState(0);
  const startRef = React.useRef(0);
  const rafRef = React.useRef<number>(0);
  const startTimeRef = React.useRef(0);

  React.useEffect(() => {
    startRef.current = displayValue;
    startTimeRef.current = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      let easedProgress = progress;
      if (easing) {
        // ease-out cubic
        easedProgress = 1 - Math.pow(1 - progress, 3);
      }

      const current =
        startRef.current + (value - startRef.current) * easedProgress;
      setDisplayValue(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration, easing]);

  const formatted = displayValue.toFixed(decimals);

  return (
    <span
      data-slot="number-ticker"
      className={cn(numberTickerVariants({ variant, size }), className)}
      {...props}
    >
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export { NumberTicker, numberTickerVariants };
