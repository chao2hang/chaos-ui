"use client";
import * as React from "react";
import { useCountUp } from "@/hooks/use-count-up";
import { cn } from "@chaos_team/chaos-ui/lib";

interface AnimatedNumberProps extends Omit<
  React.ComponentProps<"span">,
  "children"
> {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  format?: (v: number) => string;
  className?: string;
}

export function AnimatedNumber({
  value,
  duration = 1000,
  decimals = 0,
  prefix = "",
  suffix = "",
  format,
  className,
  ...props
}: AnimatedNumberProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  useCountUp(ref, value, duration, decimals, prefix, suffix, format);

  const initialText = format
    ? format(0)
    : `${prefix}${(0).toFixed(decimals)}${suffix}`;

  return (
    <span
      ref={ref}
      data-slot="animated-number"
      className={cn("tabular-nums", className)}
      {...props}
    >
      {initialText}
    </span>
  );
}
