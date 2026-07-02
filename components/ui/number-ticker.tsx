"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @component NumberTicker
 * @category ui/display
 * @since 0.2.0
 * @description Animated number counter for KPI/statistic displays / 用于 KPI/统计展示的动画数字计数器
 */

export interface NumberTickerProps extends Omit<React.ComponentProps<"span">, "prefix"> {
  /** Target number to animate to */
  value: number;
  /** Starting number (default: 0) */
  from?: number;
  /** Animation duration in ms (default: 1000) */
  duration?: number;
  /** Easing function */
  easing?: "linear" | "easeOut" | "easeInOut";
  /** Number formatter */
  format?: (n: number) => string;
  /** Decimal places (default: 0) */
  decimals?: number;
  /** Prefix text */
  prefix?: React.ReactNode;
  /** Suffix text */
  suffix?: React.ReactNode;
  /** Re-animate on value change */
  reAnimate?: boolean;
}

type EasingFn = (t: number) => number;

const easingFunctions: Record<string, EasingFn> = {
  linear: (t: number) => t,
  easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
  easeInOut: (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
};

function usePrevious<T>(value: T): T | undefined {
  const ref = React.useRef<T | undefined>(undefined);
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function NumberTicker({
  value,
  from = 0,
  duration = 1000,
  easing = "easeOut",
  format,
  decimals = 0,
  prefix,
  suffix,
  reAnimate = true,
  className,
  ...props
}: NumberTickerProps) {
  const [displayValue, setDisplayValue] = React.useState(from);
  const previousValue = usePrevious(value);
  const rafRef = React.useRef<number | null>(null);

  // Check prefers-reduced-motion
  const prefersReducedMotion = React.useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  React.useEffect(() => {
    // Determine starting point for the animation
    let startValue = from;
    if (reAnimate && previousValue !== undefined) {
      startValue = previousValue;
    }

    // If user prefers reduced motion, skip animation and show final value
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    // If duration is 0, show final value immediately
    if (duration <= 0) {
      setDisplayValue(value);
      return;
    }

    const easingFn = easingFunctions[easing] ?? easingFunctions.easeOut;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easingFn!(progress);
      const current = startValue + (value - startValue) * easedProgress;

      setDisplayValue(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    }

    // Cancel any in-progress animation
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration, easing, prefersReducedMotion]);

  // Format the displayed number
  const formattedValue = format
    ? format(displayValue)
    : displayValue.toFixed(decimals);

  return (
    <span
      data-slot="number-ticker"
      className={cn("inline-flex items-baseline tabular-nums", className)}
      {...props}
    >
      {prefix != null && <span data-slot="number-ticker-prefix">{prefix}</span>}
      <span data-slot="number-ticker-value">{formattedValue}</span>
      {suffix != null && <span data-slot="number-ticker-suffix">{suffix}</span>}
    </span>
  );
}

export { NumberTicker };
