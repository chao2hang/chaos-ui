"use client";

import type {
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { useMutation as useRqMutation } from "@tanstack/react-query";

/**
 * Type-safe wrapper around TanStack Query's `useMutation`.
 *
 * @since 1.1.0
 * @example
 * const { mutate, isPending } = useMutation({
 *   mutationFn: (data: CreateUserInput) => createUser(data),
 *   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
 * })
 */
export function useMutation<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>,
): UseMutationResult<TData, TError, TVariables, TContext> {
  return useRqMutation(options);
}

export type { UseMutationOptions, UseMutationResult };
