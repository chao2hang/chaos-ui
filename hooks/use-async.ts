"use client";
import * as React from "react";

export type AsyncStatus = "idle" | "pending" | "success" | "error";

export interface AsyncState<T> {
  status: AsyncStatus;
  data: T | undefined;
  error: Error | undefined;
}

export function useAsync<T, Args extends unknown[] = []>(
  fn: (...args: Args) => Promise<T>,
  immediate = true,
) {
  const [state, setState] = React.useState<AsyncState<T>>({
    status: "idle",
    data: undefined,
    error: undefined,
  });
  const mountedRef = React.useRef(true);
  const lastArgs = React.useRef<Args | null>(null);
  const runIdRef = React.useRef(0);

  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const run = React.useCallback(
    async (...args: Args) => {
      lastArgs.current = args;
      const runId = ++runIdRef.current;
      setState((current) => ({
        status: "pending",
        data: current.data,
        error: undefined,
      }));
      try {
        const data = await fn(...args);
        if (!mountedRef.current || runId !== runIdRef.current) return;
        setState({ status: "success", data, error: undefined });
        return data;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        if (!mountedRef.current || runId !== runIdRef.current) return;
        setState({ status: "error", data: undefined, error });
        throw error;
      }
    },
    [fn],
  );

  React.useEffect(() => {
    if (!immediate) return;
    const timeout = window.setTimeout(() => {
      run(...((lastArgs.current ?? []) as Args));
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [immediate, run]);

  return { ...state, run, isLoading: state.status === "pending" };
}
