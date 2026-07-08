"use client";

import * as React from "react";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

interface CountdownButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick">,
    VariantProps<typeof buttonVariants> {
  /** Countdown duration in seconds / 倒计时时长（秒）(default: 60) */
  duration?: number;
  /** Button content (shown when not counting down) / 按钮内容（非倒计时时显示） */
  children?: React.ReactNode;
  /** Async click handler, countdown starts after it resolves / 异步点击处理，倒计时在其完成后开始 */
  onClick?: () => void | Promise<void>;
  /** Whether button is disabled / 是否禁用 */
  disabled?: boolean;
  /** Function to format countdown text / 倒计时文本格式化函数 (default: (s) => `${s}s`) */
  countText?: (seconds: number) => string;
  /** Whether to start countdown on mount / 是否在挂载时开始倒计时 (default: false) */
  runOnMount?: boolean;
}

/**
 * @component CountdownButton
 * @category ui/data-entry
 * @since 0.2.0
 * @description Button with countdown timer for verification codes / 带倒计时定时器的验证码按钮
 * @keywords countdown, button, verification, code, timer
 * @example
 * <CountdownButton duration={60} onClick={sendCode}>Send Code</CountdownButton>
 * <CountdownButton duration={120} countText={(s) => `Resend in ${s}s`}>Send</CountdownButton>
 */
function CountdownButton({
  className,
  variant = "default",
  size = "default",
  duration = 60,
  children,
  onClick,
  disabled = false,
  countText = (s) => `${s}s`,
  runOnMount = false,
  ...props
}: CountdownButtonProps) {
  const [counting, setCounting] = React.useState(false);
  const [secondsLeft, setSecondsLeft] = React.useState(duration);
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const startCountdown = React.useCallback(() => {
    setCounting(true);
    setSecondsLeft(duration);
    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          setCounting(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [duration]);

  React.useEffect(() => {
    if (runOnMount) {
      startCountdown();
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [runOnMount, startCountdown]);

  const handleClick = async () => {
    if (counting || disabled) return;
    if (onClick) {
      await onClick();
    }
    startCountdown();
  };

  const isDisabled = disabled || counting;

  return (
    <button
      data-slot="countdown-button"
      className={cn(
        buttonVariants({ variant, size }),
        isDisabled && "pointer-events-none opacity-50",
        className,
      )}
      disabled={isDisabled}
      onClick={handleClick}
      {...props}
    >
      {counting ? countText(secondsLeft) : children}
    </button>
  );
}

export { CountdownButton };
export type { CountdownButtonProps };
