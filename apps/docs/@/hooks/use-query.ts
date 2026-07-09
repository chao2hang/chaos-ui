"use client";

import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { useQuery as useRqQuery } from "@tanstack/react-query";

/**
 * Type-safe wrapper around TanStack Query's `useQuery`.
 *
 * Consumers must install `@tanstack/react-query` and wrap their app with
 * `QueryClientProvider`. This hook is a thin pass-through that adds
 * enterprise defaults (e.g. `staleTime: 30_000`) so teams can adopt
 * query caching without boilerplate.
 *
 * @since 1.1.0
 * @example
 * const { data, isLoading } = useQuery({
 *   queryKey: ["users", userId],
 *   queryFn: () => fetchUser(userId),
 * })
 */
export function useQuery<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends readonly unknown[] = readonly unknown[],
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
): UseQueryResult<TData, TError> {
  return useRqQuery({
    staleTime: 30_000,
    ...options,
  });
}

export type { UseQueryOptions, UseQueryResult };
