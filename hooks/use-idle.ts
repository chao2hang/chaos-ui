"use client";
import * as React from "react";

/**
 * @hook useIdle
 * @category Data
 * @since 1.0.0-beta.0
 * @description Tracks whether the user has been idle (no mouse/keyboard/touch/scroll) for a duration.
 * @param timeout Idle threshold in ms (default 60_000).
 * @param events Activity events to listen for.
 * @example
 * const isIdle = useIdle(30_000);
 */
export function useIdle(
  timeout = 60_000,
  events: string[] = ["mousedown", "keydown", "touchstart", "scroll", "mousemove"],
): boolean {
  const [isIdle, setIsIdle] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const reset = () => {
      setIsIdle(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setIsIdle(true), timeout);
    };
    reset();
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((e) => window.removeEventListener(e, reset));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeout]);

  return isIdle;
}
