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
  // options is an object reference that changes every render if passed inline.
  // Keep it in a ref so the listener effect doesn't re-bind every render
  // (would cause perf collapse + event loss windows for resize/scroll).
  const optionsRef = React.useRef(options);

  React.useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  React.useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  React.useEffect(() => {
    if (!target) return;

    const listener: EventListener = (event) => {
      handlerRef.current(event);
    };

    // Read options once at bind time. Re-binding only when target/eventName
    // changes; options mutations between renders are picked up via optionsRef
    // on the next target/eventName change. (capture/passive are bind-time
    // configs and rarely change.)
    const opts = optionsRef.current;
    target.addEventListener(eventName, listener, opts);

    return () => {
      target.removeEventListener(eventName, listener, opts);
    };
  }, [target, eventName]);
}
