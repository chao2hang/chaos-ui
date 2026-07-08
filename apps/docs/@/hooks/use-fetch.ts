"use client";
import * as React from "react";

/**
 * @hook useFetch
 * @category Data
 * @since 1.0.0-beta.0
 * @description Lightweight fetch hook with abort, re-fetch, and manual trigger.
 * @param input Request URL or Request object.
 * @param init Fetch init options.
 * @example
 * const { data, error, isLoading, refetch } = useFetch("/api/users");
 */
export interface UseFetchState<T> {
  data: T | undefined;
  error: Error | undefined;
  isLoading: boolean;
}

export function useFetch<T = unknown>(
  input: string | URL | Request,
  init?: RequestInit,
): UseFetchState<T> & { refetch: () => void } {
  const [state, setState] = React.useState<UseFetchState<T>>({
    data: undefined,
    error: undefined,
    isLoading: true,
  });
  const mountedRef = React.useRef(true);
  const tickRef = React.useRef(0);
  const [tick, setTick] = React.useState(0);

  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const refetch = React.useCallback(() => {
    setTick((t) => t + 1);
  }, []);

  React.useEffect(() => {
    const controller = new AbortController();
    tickRef.current += 1;
    const myTick = tickRef.current;
    setState((s) => ({ ...s, isLoading: true, error: undefined }));
    fetch(input, { ...init, signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as T;
        if (mountedRef.current && myTick === tickRef.current) {
          setState({ data, error: undefined, isLoading: false });
        }
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        if (mountedRef.current && myTick === tickRef.current) {
          const error = err instanceof Error ? err : new Error(String(err));
          setState((s) => ({ ...s, error, isLoading: false }));
        }
      });
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, JSON.stringify(init), tick]);

  return { ...state, refetch };
}
