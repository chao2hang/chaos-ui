"use client";
import * as React from "react";

/**
 * @hook useSwr
 * @category Data
 * @since 1.0.0-beta.0
 * @description SWR-style data fetching with revalidation on focus and interval.
 * @param key Cache key (falsy disables fetching).
 * @param fetcher Function that returns a Promise of data.
 * @param options revalidateOnFocus, dedupingInterval, refreshInterval.
 * @example
 * const { data, error, isLoading, mutate } = useSwr("/api/users", fetcher);
 */
export interface UseSwrOptions {
  revalidateOnFocus?: boolean;
  refreshInterval?: number;
  dedupingInterval?: number;
}

export interface UseSwrState<T> {
  data: T | undefined;
  error: Error | undefined;
  isLoading: boolean;
  mutate: (data?: T | ((prev: T | undefined) => T)) => void;
}

const cache = new Map<string, { data: unknown; ts: number }>();

export function useSwr<T>(
  key: string | null,
  fetcher: (key: string) => Promise<T>,
  options: UseSwrOptions = {},
): UseSwrState<T> {
  const {
    revalidateOnFocus = true,
    refreshInterval = 0,
    dedupingInterval = 2000,
  } = options;
  const [data, setData] = React.useState<T | undefined>(
    key && cache.has(key) ? (cache.get(key)!.data as T) : undefined,
  );
  const [error, setError] = React.useState<Error | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState(
    key !== null && !(key && cache.has(key)),
  );
  const mountedRef = React.useRef(true);
  const lastFetchedRef = React.useRef(0);
  const reqIdRef = React.useRef(0);
  const keyRef = React.useRef(key);
  keyRef.current = key;

  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Reset dedupe window when key changes.
  React.useEffect(() => {
    lastFetchedRef.current = 0;
  }, [key]);

  const run = React.useCallback(() => {
    if (!key) return;
    const now = Date.now();
    if (
      now - lastFetchedRef.current < dedupingInterval &&
      lastFetchedRef.current !== 0
    ) {
      return;
    }
    lastFetchedRef.current = now;
    const reqId = ++reqIdRef.current;
    const requestKey = key;
    setIsLoading(true);
    fetcher(requestKey)
      .then((d) => {
        if (
          !mountedRef.current ||
          reqId !== reqIdRef.current ||
          keyRef.current !== requestKey
        )
          return;
        cache.set(requestKey, { data: d, ts: now });
        setData(d);
        setError(undefined);
        setIsLoading(false);
      })
      .catch((err: unknown) => {
        if (
          !mountedRef.current ||
          reqId !== reqIdRef.current ||
          keyRef.current !== requestKey
        )
          return;
        setError(err instanceof Error ? err : new Error(String(err)));
        setIsLoading(false);
      });
  }, [key, fetcher, dedupingInterval]);

  React.useEffect(() => {
    if (!key) return;
    run();
    let intervalId: ReturnType<typeof setInterval> | undefined;
    if (refreshInterval > 0) {
      intervalId = setInterval(run, refreshInterval);
    }
    const onFocus = () => {
      if (revalidateOnFocus) run();
    };
    if (revalidateOnFocus && typeof window !== "undefined") {
      window.addEventListener("focus", onFocus);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
      if (typeof window !== "undefined") {
        window.removeEventListener("focus", onFocus);
      }
    };
  }, [key, run, refreshInterval, revalidateOnFocus]);

  const mutate = React.useCallback(
    (next?: T | ((prev: T | undefined) => T)) => {
      if (!key) return;
      setData((prev) => {
        const value =
          typeof next === "function"
            ? (next as (p: T | undefined) => T)(prev)
            : next;
        if (value !== undefined) {
          cache.set(key, { data: value, ts: Date.now() });
        }
        return value !== undefined ? value : prev;
      });
    },
    [key],
  );

  return { data, error, isLoading, mutate };
}
