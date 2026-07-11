"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Resolver } from "react-hook-form";
import { useForm } from "./use-form";
import type { FieldValues, UseFormProps } from "react-hook-form";

/**
 * Schema-driven wrapper around {@link useForm}.
 *
 * - Accepts a zod schema and wires it through `zodResolver` automatically.
 * - For yup / valibot / custom schema libraries, pass `resolver` directly
 *   (e.g. `yupResolver(schema)`); `schema` and custom resolvers are mutually
 *   exclusive — `resolver` wins when both are supplied.
 * - When neither is supplied, behaves like plain {@link useForm} so the hook
 *   is safely composable inside mixed caller code paths.
 *
 * `zod` and `@hookform/resolvers` are declared as optional peer dependencies;
 * consumers adopting schema-driven forms must install them.
 *
 * @since 1.1.0
 * @example
 * const form = useFormSchema({
 *   schema: loginSchema,
 *   defaultValues: { email: "", password: "" },
 * })
 */
export interface UseFormSchemaOptions<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
> extends Omit<UseFormProps<TFieldValues, TContext>, "resolver"> {
  /**
   * Zod schema. Auto-detected via `zodResolver`; for other libraries use
   * `resolver` instead. `z.infer<typeof schema>` must align with
   * `TFieldValues` (the hook will infer it for you when omitted).
   *
   * Typed loosely (`unknown`) intentionally: zod v3/v4 surface slightly
   * different generic arities and we pass the schema straight into
   * `zodResolver`, which is the single source of truth for shape.
   */
  schema?: unknown;
  /**
   * Explicit react-hook-form resolver. Takes precedence over `schema`.
   * Pass `yupResolver` / `valibotResolver` / a custom resolver here.
   */
  resolver?: Resolver<TFieldValues, TContext>;
}

/**
 * Infer field values from a zod schema.
 *
 * @example
 * const form = useFormSchema({
 *   schema: z.object({ email: z.string() }),
 *   defaultValues: { email: "" },
 * })
 */
export function useFormSchema<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
>(options: UseFormSchemaOptions<TFieldValues, TContext> = {}) {
  const { schema, resolver: explicitResolver, ...rest } = options;

  // Derive the resolver synchronously before calling useForm, so the hook
  // is always called exactly once regardless of which branch we take.
  const resolver: Resolver<TFieldValues, TContext> | undefined =
    explicitResolver ??
    (schema
      ? (zodResolver(schema as never) as unknown as Resolver<
          TFieldValues,
          TContext
        >)
      : undefined);

  return useForm<TFieldValues, TContext>(
    resolver ? { ...rest, resolver } : rest,
  );
}

/**
 * Convenience adapter mirroring `@chaos_team/chaos-ui` usage so consumers
 * can write `const resolver = zodResolverAdapter(loginSchema)` without
 * importing `@hookform/resolvers/zod` themselves.
 */
function zodResolverAdapter<TFieldValues extends FieldValues>(
  schema: unknown,
): Resolver<TFieldValues> {
  return zodResolver(schema as never) as unknown as Resolver<TFieldValues>;
}

export { zodResolverAdapter };
