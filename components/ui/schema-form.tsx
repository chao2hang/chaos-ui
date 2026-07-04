"use client";

import * as React from "react";
import { useTranslation } from "react-i18next";
import type { FieldValues } from "react-hook-form";
import { useFormSchema } from "@/hooks/use-form-schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Field-level render hints. Consumers can layer extra control over the
 * auto-derived schema (label, helper, control kind, options, placeholder).
 */
export interface SchemaFormFieldOption {
  value: string;
  label: string;
}

export type SchemaFormFieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "date"
  | "textarea"
  | "checkbox"
  | "switch"
  | "select";

export interface SchemaFormFieldOverride {
  /** Control kind hinted by the consumer. Falls back to `text`. */
  type?: SchemaFormFieldType;
  label?: React.ReactNode;
  /** Place inside the label for `checkbox`/`switch`; otherwise used as the form label. */
  description?: React.ReactNode;
  placeholder?: string;
  options?: SchemaFormFieldOption[];
  /** Hide this field from rendering, useful when used with defaultValues only. */
  hidden?: boolean;
  /** Mark required — adds the destructive `*` and improves a11y. */
  required?: boolean;
  /** Disable the input rendered for this field. */
  disabled?: boolean;
  className?: string;
}

export interface SchemaFormProps<TFieldValues> {
  /**
   * Zod object schema driving the form shape and validation.
   * Typed loosely (`unknown`) so the component accepts schemas authored under
   * both zod v3 and v4 without exposing their differing generic arities.
   */
  schema: unknown;
  /** Initial values for the form. Must satisfy the schema. */
  defaultValues: TFieldValues;
  /**
   * Per-field overrides keyed by the schema field name. When `type` is
   * omitted, defaults to `text` (or `select` when `options` is supplied).
   */
  fields?: Partial<Record<string, SchemaFormFieldOverride>>;
  /** Submit handler invoked with validated values. */
  onSubmit?: (values: TFieldValues) => void | Promise<void>;
  /** Submit button label. Pass `null` to render no submit button. */
  submitText?: React.ReactNode;
  /** Reset button label. Pass `null` to render no reset button. */
  resetText?: React.ReactNode;
  /** Disable the whole form (e.g. while async submitting). */
  isLoading?: boolean;
  className?: string;
  /** Layout: stacked rows (default) or a grid. */
  layout?: "stack" | "grid";
  /** Columns when layout === "grid". Defaults to 2. */
  columns?: number;
}

function resolveControlType(
  override: SchemaFormFieldOverride | undefined,
): SchemaFormFieldType {
  if (override?.type) return override.type;
  // When options are supplied but no explicit type, default to select.
  if (override?.options && override.options.length > 0) return "select";
  return "text";
}

/**
 * @component SchemaForm
 * @category ui/data-entry
 * @since 1.1.0
 * @description A schema-driven form component pairing a zod schema with react-hook-form, rendering fields from `fields` overrides (falling back to defaultValues keys) / 由 zod schema 驱动的表单组件，结合 react-hook-form 与消费者覆盖渲染字段
 * @keywords schema, form, zod, react-hook-form, validation, auto-derive
 * @example
 * <SchemaForm
 *   schema={loginSchema}
 *   defaultValues={{ email: "", password: "" }}
 *   fields={{
 *     email: { type: "email", label: "Email" },
 *     password: { type: "password", label: "Password" },
 *   }}
 *   onSubmit={(v) => console.log(v)}
 * />
 */
function SchemaForm<TFieldValues extends FieldValues>({
  schema,
  defaultValues,
  fields: fieldOverrides,
  onSubmit,
  submitText,
  resetText,
  isLoading,
  className,
  layout = "stack",
  columns = 2,
}: SchemaFormProps<TFieldValues>) {
  const { t } = useTranslation("ui");
  const form = useFormSchema<TFieldValues>({
    schema,
    defaultValues: defaultValues as never,
  });

  // Resolve button labels via i18n, allowing consumer overrides.
  const resolvedSubmit =
    submitText === null ? null : (submitText ?? t("schemaForm.submit"));
  const resolvedReset =
    resetText === null ? null : (resetText ?? t("schemaForm.reset"));
  const selectFallback = t("schemaForm.selectPlaceholder");

  // Field order: union of override keys and defaultValues keys (override first).
  const fieldNames = React.useMemo(() => {
    const fromOverrides = fieldOverrides ? Object.keys(fieldOverrides) : [];
    const fromDefaults = Object.keys(defaultValues);
    const ordered = new Set<string>([...fromOverrides, ...fromDefaults]);
    return Array.from(ordered);
  }, [fieldOverrides, defaultValues]);

  const handleSubmit = React.useMemo(
    () =>
      form.handleSubmit(async (values) => {
        await onSubmit?.(values);
      }),
    [form, onSubmit],
  );

  const colClass =
    layout === "grid"
      ? cn(
          "grid gap-4 sm:grid-cols-2",
          columns !== 2 && `sm:grid-cols-${columns}`,
        )
      : "flex flex-col gap-4";

  return (
    <Form {...form}>
      <form
        data-slot="schema-form"
        className={cn(colClass, className)}
        onSubmit={handleSubmit}
      >
        {fieldNames.map((name) => {
          const override = fieldOverrides?.[name];
          if (override?.hidden) return null;
          const controlType = resolveControlType(override);
          const isRequired = override?.required ?? false;

          const labelNode: React.ReactNode = override?.label ?? (
            <span className="capitalize">{String(name)}</span>
          );

          return (
            <FormField
              key={name}
              control={form.control}
              name={name as never}
              render={({ field }) => (
                <FormItem
                  className={cn(
                    controlType === "switch" &&
                      "flex flex-row items-center justify-between gap-3",
                    override?.className,
                  )}
                >
                  {controlType !== "checkbox" && controlType !== "switch" && (
                    <FormLabel required={isRequired}>{labelNode}</FormLabel>
                  )}
                  <FormControl>
                    {renderControl({
                      controlType,
                      field,
                      override: override ?? {},
                      label: labelNode,
                      selectPlaceholder: selectFallback,
                    })}
                  </FormControl>
                  {override?.description ? (
                    <FormDescription>{override.description}</FormDescription>
                  ) : null}
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}

        {(resolvedSubmit !== null || resolvedReset !== null) && (
          <div className="flex items-center gap-2 pt-1">
            {resolvedSubmit !== null && (
              <Button type="submit" disabled={isLoading}>
                {typeof resolvedSubmit === "string"
                  ? resolvedSubmit
                  : t("schemaForm.submit")}
              </Button>
            )}
            {resolvedReset !== null && (
              <Button
                type="button"
                variant="outline"
                disabled={isLoading}
                onClick={() => form.reset(defaultValues)}
              >
                {typeof resolvedReset === "string"
                  ? resolvedReset
                  : t("schemaForm.reset")}
              </Button>
            )}
          </div>
        )}
      </form>
    </Form>
  );
}

function renderControl(args: {
  controlType: SchemaFormFieldType;
  field: {
    value: unknown;
    onChange: (v: unknown) => void;
    onBlur: () => void;
    disabled?: boolean;
    name: string;
    ref?: React.Ref<unknown>;
  };
  override: SchemaFormFieldOverride;
  label: React.ReactNode;
  selectPlaceholder?: string;
}): React.ReactNode {
  const { controlType, field, override, label, selectPlaceholder } = args;
  const disabled = field.disabled || override.disabled;

  switch (controlType) {
    case "textarea":
      return (
        <Textarea
          value={(field.value as string) ?? ""}
          placeholder={override.placeholder}
          disabled={disabled}
          onChange={(e) => field.onChange(e.target.value)}
          onBlur={field.onBlur}
        />
      );
    case "checkbox":
      return (
        <div className="flex items-center gap-2">
          <Checkbox
            checked={field.value === true}
            disabled={disabled}
            onCheckedChange={(c) => field.onChange(c === true)}
          />
          <span className="text-sm">{label}</span>
        </div>
      );
    case "switch":
      return (
        <Switch
          checked={field.value === true}
          disabled={disabled}
          onCheckedChange={(c) => field.onChange(c)}
        />
      );
    case "select":
      return (
        <Select
          value={(field.value as string) ?? undefined}
          disabled={disabled}
          onValueChange={(v) => field.onChange(v ?? "")}
        >
          <SelectTrigger>
            <SelectValue
              placeholder={
                override.placeholder ?? selectPlaceholder ?? "Select..."
              }
            />
          </SelectTrigger>
          <SelectContent>
            {(override.options ?? []).map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    case "number":
      return (
        <Input
          type="number"
          value={(field.value as string | number) ?? ""}
          placeholder={override.placeholder}
          disabled={disabled}
          onChange={(e) =>
            field.onChange(
              Number.isNaN(e.target.valueAsNumber)
                ? ""
                : e.target.valueAsNumber,
            )
          }
          onBlur={field.onBlur}
        />
      );
    case "email":
    case "password":
    case "date":
      return (
        <Input
          type={controlType}
          value={(field.value as string) ?? ""}
          placeholder={override.placeholder}
          disabled={disabled}
          onChange={(e) => field.onChange(e.target.value)}
          onBlur={field.onBlur}
        />
      );
    default:
      return (
        <Input
          type="text"
          value={(field.value as string) ?? ""}
          placeholder={override.placeholder}
          disabled={disabled}
          onChange={(e) => field.onChange(e.target.value)}
          onBlur={field.onBlur}
        />
      );
  }
}

export { SchemaForm };
