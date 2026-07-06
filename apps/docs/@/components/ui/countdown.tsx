"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const countdownVariants = cva(
  "inline-flex items-center gap-1 font-mono tabular-nums",
  {
    variants: {
      variant: {
        default: "text-foreground",
        primary: "text-primary",
        muted: "text-muted-foreground",
      },
      size: {
        default: "text-2xl",
        sm: "text-lg",
        lg: "text-4xl",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

interface CountdownProps
  extends React.ComponentProps<"span">, VariantProps<typeof countdownVariants> {
  /** Target date/time (ISO string or timestamp) */
  target: Date | number | string;
  /** Called when countdown reaches 0 */
  onFinish?: () => void;
  /** Format: D=days, H=hours, M=minutes, S=seconds */
  format?: string;
}

function Countdown({
  className,
  variant,
  size,
  target,
  onFinish,
  format = "HH:mm:ss",
  ...props
}: CountdownProps) {
  const [remaining, setRemaining] = React.useState(0);
  const finished = React.useRef(false);

  React.useEffect(() => {
    const targetTime =
      typeof target === "string" || typeof target === "number"
        ? new Date(target).getTime()
        : target.getTime();

    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, targetTime - now);
      setRemaining(diff);

      if (diff <= 0 && !finished.current) {
        finished.current = true;
        onFinish?.();
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [target, onFinish]);

  const formatTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return format
      .replace("DD", String(days).padStart(2, "0"))
      .replace("HH", String(hours).padStart(2, "0"))
      .replace("mm", String(minutes).padStart(2, "0"))
      .replace("ss", String(seconds).padStart(2, "0"));
  };

  return (
    <span
      data-slot="countdown"
      className={cn(countdownVariants({ variant, size }), className)}
      aria-live="polite"
      role="timer"
      {...props}
    >
      {formatTime(remaining)}
    </span>
  );
}

export { Countdown, countdownVariants };
