"use client";
import * as React from "react";

/**
 * @hook useAsyncTask
 * @category Data
 * @since 1.0.0-beta.0
 * @description Trigger a one-shot async task with progress, retry, and abort.
 * @param task Async function returning a result.
 * @example
 * const { run, status, data, error, isLoading, abort } = useAsyncTask(async (signal) => {...});
 */
export interface UseAsyncTaskResult<T> {
  run: (...args: never[]) => Promise<T | undefined>;
  status: "idle" | "pending" | "success" | "error";
  data: T | undefined;
  error: Error | undefined;
  isLoading: boolean;
  abort: () => void;
  reset: () => void;
}

export function useAsyncTask<T>(
  task: (signal: AbortSignal) => Promise<T>,
): UseAsyncTaskResult<T> {
  const [status, setStatus] = React.useState<"idle" | "pending" | "success" | "error">("idle");
  const [data, setData] = React.useState<T | undefined>(undefined);
  const [error, setError] = React.useState<Error | undefined>(undefined);
  const controllerRef = React.useRef<AbortController | null>(null);
  const mountedRef = React.useRef(true);

  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      controllerRef.current?.abort();
    };
  }, []);

  const run = React.useCallback(async () => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setStatus("pending");
    setError(undefined);
    try {
      const result = await task(controller.signal);
      if (controller.signal.aborted || !mountedRef.current) return undefined;
      setData(result);
      setStatus("success");
      return result;
    } catch (err) {
      if (controller.signal.aborted || !mountedRef.current) return undefined;
      setError(err instanceof Error ? err : new Error(String(err)));
      setStatus("error");
      throw err;
    }
  }, [task]);

  const abort = React.useCallback(() => {
    controllerRef.current?.abort();
  }, []);

  const reset = React.useCallback(() => {
    setStatus("idle");
    setData(undefined);
    setError(undefined);
  }, []);

  return {
    run: run as UseAsyncTaskResult<T>["run"],
    status,
    data,
    error,
    isLoading: status === "pending",
    abort,
    reset,
  };
}
