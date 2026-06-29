"use client";
import * as React from "react";

/**
 * @hook useEventListener
 * @category hooks/effect
 * @since 0.2.0
 * @description DOM 事件订阅 / DOM event listener hook
 * @example
 * useEventListener(window, 'resize', () => console.log('resized'));
 * useEventListener(document, 'keydown', handler);
 */
export function useEventListener<
  T extends HTMLElement | Window | Document | MediaQueryList,
  K extends keyof WindowEventMap,
>(
  target: T | null | undefined,
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  options?: AddEventListenerOptions,
): void;

export function useEventListener(
  target: HTMLElement | Window | Document | MediaQueryList | null | undefined,
  eventName: string,
  handler: (event: Event) => void,
  options?: AddEventListenerOptions,
): void;

export function useEventListener(
  target: HTMLElement | Window | Document | MediaQueryList | null | undefined,
  eventName: string,
  handler: (event: any) => void,
  options?: AddEventListenerOptions,
): void {
  const handlerRef = React.useRef(handler);

  React.useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  React.useEffect(() => {
    if (!target) return;

    const listener: EventListener = (event) => {
      handlerRef.current(event);
    };

    target.addEventListener(eventName, listener, options);

    return () => {
      target.removeEventListener(eventName, listener, options);
    };
  }, [target, eventName, options]);
}
