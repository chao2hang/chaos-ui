"use client";
import * as React from "react";

/**
 * @hook useApproval
 * @category Data
 * @since 1.0.0-beta.0
 * @description Drives an approval action (approve/reject/transfer) with async state and result tracking.
 * @param submit Async handler invoked with the action type and optional comment.
 * @example
 * const { submit, status, data, error, isLoading } = useApproval(async (action) => api.post(...));
 */
export type ApprovalAction = "approve" | "reject" | "transfer";

export interface UseApprovalResult<T> {
  submit: (action: ApprovalAction, comment?: string) => Promise<T | undefined>;
  status: "idle" | "pending" | "success" | "error";
  data: T | undefined;
  error: Error | undefined;
  isLoading: boolean;
}

export function useApproval<T = unknown>(
  handler: (action: ApprovalAction, comment?: string) => Promise<T>,
): UseApprovalResult<T> {
  const [result, setResult] = React.useState<T | undefined>(undefined);
  const [status, setStatus] = React.useState<"idle" | "pending" | "success" | "error">("idle");
  const [error, setError] = React.useState<Error | undefined>(undefined);
  const mountedRef = React.useRef(true);

  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const submit = React.useCallback(
    async (action: ApprovalAction, comment?: string) => {
      setStatus("pending");
      setError(undefined);
      try {
        const data = await handler(action, comment);
        if (!mountedRef.current) return undefined;
        setResult(data);
        setStatus("success");
        return data;
      } catch (err) {
        if (!mountedRef.current) return undefined;
        setError(err instanceof Error ? err : new Error(String(err)));
        setStatus("error");
        throw err;
      }
    },
    [handler],
  );

  return { submit, status, data: result, error, isLoading: status === "pending" };
}
