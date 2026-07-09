"use client"

import {
  useForm as useRHF,
  type UseFormProps as RHFUseFormProps,
  type FieldValues,
} from "react-hook-form"

/**
 * Enhanced form hook wrapping react-hook-form with enterprise defaults.
 * - `mode: "onTouched"` by default (fewer re-renders)
 * - `reValidateMode: "onChange"`
 * - Standardized dirty/submit tracking
 *
 * @since 0.2.0
 */
export function useForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
>(
  props?: RHFUseFormProps<TFieldValues, TContext>,
) {
  const form = useRHF<TFieldValues, TContext>({
    mode: "onTouched",
    reValidateMode: "onChange",
    ...props,
  })

  return form
}

export type { FieldValues, UseFormProps } from "react-hook-form"
