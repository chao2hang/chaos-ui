"use client";
import * as React from "react";

/**
 * @hook useKey
 * @category hooks/effect
 * @since 0.2.0
 * @description 键盘事件 Hook / Keyboard event hook
 * @example
 * useKey('Escape', () => close());
 * useKey(['Meta+k', 'Control+k'], () => openPalette());
 */
export type KeyFilter =
  | string
  | string[]
  | ((event: KeyboardEvent) => boolean);

export type KeyHandler = (event: KeyboardEvent) => void;

export interface UseKeyOptions {
  /** Event type: 'keydown' | 'keyup' | 'keypress' / 事件类型 */
  event?: "keydown" | "keyup" | "keypress";
  /** Target element (default: window) / 目标元素 */
  target?: HTMLElement | Window | Document | null;
  /** Whether to prevent default / 是否阻止默认行为 */
  preventDefault?: boolean;
  /** Whether the hook is active / 是否激活 */
  enabled?: boolean;
}

function matchKey(event: KeyboardEvent, key: string): boolean {
  const parts = key.toLowerCase().split("+");
  const eventKey = event.key.toLowerCase();

  const needCtrl = parts.includes("ctrl") || parts.includes("control");
  const needMeta = parts.includes("meta") || parts.includes("cmd");
  const needShift = parts.includes("shift");
  const needAlt = parts.includes("alt");

  const actualKey = parts.filter(
    (p) =>
      !["ctrl", "control", "meta", "cmd", "shift", "alt"].includes(p),
  )[0];

  return (
    eventKey === actualKey &&
    event.ctrlKey === needCtrl &&
    event.metaKey === needMeta &&
    event.shiftKey === needShift &&
    event.altKey === needAlt
  );
}

export function useKey(
  keys: KeyFilter,
  handler: KeyHandler,
  options: UseKeyOptions = {},
): void {
  const {
    event: eventType = "keydown",
    target,
    preventDefault = false,
    enabled = true,
  } = options;

  const handlerRef = React.useRef(handler);
  React.useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  React.useEffect(() => {
    if (!enabled) return;

    const targetEl = target ?? window;
    const listener = (event: Event) => {
      const e = event as KeyboardEvent;
      let shouldHandle = false;

      if (typeof keys === "function") {
        shouldHandle = keys(e);
      } else if (typeof keys === "string") {
        shouldHandle = matchKey(e, keys);
      } else if (Array.isArray(keys)) {
        shouldHandle = keys.some((k) => matchKey(e, k));
      }

      if (shouldHandle) {
        if (preventDefault) e.preventDefault();
        handlerRef.current(e);
      }
    };

    targetEl.addEventListener(eventType, listener as EventListener);
    return () => targetEl.removeEventListener(eventType, listener as EventListener);
  }, [keys, eventType, target, preventDefault, enabled]);
}

export function useKeyCombo(
  combo: string,
  handler: KeyHandler,
  options?: UseKeyOptions,
): void {
  useKey(combo, handler, options);
}
