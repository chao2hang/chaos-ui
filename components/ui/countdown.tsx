"use client";

import * as React from "react";
import { useCountdown } from "@/hooks/use-countdown";
import { cn } from "@/lib/utils";

/**
 * @component Countdown
 * @category ui/data-display
 * @since 0.5.0
 * @description Countdown display — renders useCountdown as a UI component.
 * / 倒计时组件，将 useCountdown hook 呈现为 UI
 * @keywords countdown, timer, deadline
 * @example
 * <Countdown target={Date.now() + 3600000} format="HH:mm:ss" />
 */

type CountdownFormat = "HH:mm:ss" | "mm:ss" | "dd:HH:mm:ss" | "ms" | string;

interface CountdownProps {
  /** Target timestamp (ms) / 目标时间戳 */
  target: number;
  /** Display format / 显示格式 */
  format?: CountdownFormat;
  /** Called when countdown reaches zero / 倒计时结束时回调 */
  onFinish?: () => void;
  /** Whether to show days / 是否显示天 */
  days?: boolean;
  className?: string;
}

function Countdown({
  target,
  format = "HH:mm:ss",
  onFinish,
  days = false,
  className,
}: CountdownProps) {
  const { days: d, hours: h, minutes: m, seconds: s, isFinished, totalSeconds } = useCountdown(target);

  React.useEffect(() => {
    if (isFinished) onFinish?.();
  }, [isFinished, onFinish]);

  const pad = (n: number) => String(n).padStart(2, "0");

  let display: string;
  if (format === "ms") {
    display = String(Math.max(0, totalSeconds * 1000));
  } else if (format === "mm:ss") {
    display = `${pad(m)}:${pad(s)}`;
  } else if (format === "dd:HH:mm:ss" || days) {
    display = `${d}:${pad(h)}:${pad(m)}:${pad(s)}`;
  } else {
    display = `${pad(h)}:${pad(m)}:${pad(s)}`;
  }

  return (
    <span
      data-slot="countdown"
      className={cn("font-mono tabular-nums", className)}
    >
      {isFinished ? "00:00:00" : display}
    </span>
  );
}

export { Countdown };
export type { CountdownProps, CountdownFormat };