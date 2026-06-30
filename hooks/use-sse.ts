"use client";
import * as React from "react";

/**
 * @hook useSse
 * @category Data
 * @since 1.0.0-beta.0
 * @description Subscribe to a Server-Sent Events stream. Auto-reconnect and cleanup.
 * @param url SSE endpoint URL. Falsy disables the connection.
 * @param options onMessage handler, event name filter, withCredentials.
 * @example
 * const { readyState, lastEvent } = useSse("/api/stream", { onMessage: console.log });
 */
export interface UseSseOptions {
  onMessage?: (data: string, event: MessageEvent) => void;
  event?: string;
  withCredentials?: boolean;
}

export interface UseSseState {
  readyState: number;
  lastEvent: string | undefined;
  error: Event | undefined;
}

export function useSse(
  url: string | null,
  options: UseSseOptions = {},
): UseSseState {
  const { onMessage, event, withCredentials = false } = options;
  const [state, setState] = React.useState<UseSseState>({
    readyState: 0,
    lastEvent: undefined,
    error: undefined,
  });
  const handlerRef = React.useRef(onMessage);
  handlerRef.current = onMessage;

  React.useEffect(() => {
    if (!url || typeof EventSource === "undefined") return;
    const source = new EventSource(url, { withCredentials });
    setState((s) => ({ ...s, readyState: source.readyState }));

    const target = event ? source : source;
    const type = event ?? "message";
    const listener = (e: MessageEvent) => {
      setState((s) => ({ ...s, lastEvent: e.data, readyState: source.readyState }));
      handlerRef.current?.(e.data, e);
    };
    target.addEventListener(type, listener as EventListener);

    const onError = (err: Event) => {
      setState((s) => ({ ...s, error: err, readyState: source.readyState }));
    };
    source.addEventListener("error", onError);

    return () => {
      source.removeEventListener(type, listener as EventListener);
      source.removeEventListener("error", onError);
      source.close();
    };
  }, [url, event, withCredentials]);

  return state;
}
