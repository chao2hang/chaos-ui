"use client";

import * as React from "react";
import { useSafeTranslation as useTranslation } from "@/components/ui/i18n-provider";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DatePicker } from "@/components/ui/date-picker";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { ChevronDownIcon, ChevronRightIcon } from "@/components/ui/icons";
import {
  BrowserField,
  type BrowserFieldProps,
} from "@/components/business/browser-field";

/**
 * @component SchemaForm
 * @note JSON/config-driven form on the **business** entry (`@chaos_team/chaos-ui/business`). Not the ui Zod/RHF SchemaForm (`@chaos_team/chaos-ui` / `/ui`).
 * @category business/form
 * @since 1.14.0
 * @description JSON/配置驱动的表单，对齐 Ecology WeaForm + fieldConfig。仅凭一份
 * schema 渲染文本/下拉/日期/浏览等字段，支持分组、联动与校验。内部复用 ui 表单原语
 * 与 BrowserField，不重复实现控件。 / JSON/config-driven form aligning with Ecology
 * WeaForm + fieldConfig. Renders fields from a single schema with grouping, linkage,
 * and validation, reusing ui primitives and BrowserField.
 * @keywords form, schema, json, config-driven, dynamic, lowcode
 * @example
 * ```tsx
 * const schema = {
 *   groups: [{
 *     key: 'base', title: '基本信息',
 *     fields: [
 *       { name: 'name', label: '名称', type: 'text', required: true },
 *       { name: 'dept', label: '部门', type: 'browser', multiple: false },
 *     ],
 *   }],
 * };
 * <SchemaForm schema={schema} value={data} onChange={setData} onSubmit={save} />
 * ```
 */

/* ------------------------------------------------------------------ */
/*  Schema types                                                        */
/* ------------------------------------------------------------------ */

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "select"
  | "multiSelect"
  | "checkbox"
  | "switch"
  | "radio"
  | "date"
  | "dateTime"
  | "dateRange"
  | "browser"
  | "treeSelect"
  | "upload"
  | "custom";

export interface FormFieldRule {
  required?: boolean | string;
  pattern?: RegExp | string;
  min?: number;
  max?: number;
  message?: string;
  validator?: (
    value: unknown,
    formData: Record<string, unknown>,
  ) => string | true;
}

export interface FormFieldDependency {
  name: string;
  when: unknown;
  then: Partial<FormFieldSchema>;
}

export interface FormFieldSchema {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  hidden?: boolean;
  disabled?: boolean;
  placeholder?: string;
  defaultValue?: unknown;
  options?: Array<{ label: string; value: string }>;
  /** Browser field config (when type === 'browser'). */
  browser?: Omit<BrowserFieldProps, "value" | "labels" | "onChange">;
  rules?: FormFieldRule[];
  colSpan?: number;
  dependencies?: FormFieldDependency[];
  /** Extra props passed through to the underlying control. */
  props?: Record<string, unknown>;
  /** Custom renderer (when type === 'custom'). */
  render?: (
    value: unknown,
    onChange: (v: unknown) => void,
    field: FormFieldSchema,
  ) => React.ReactNode;
}

export interface FormGroupSchema {
  key: string;
  title?: string;
  collapsed?: boolean;
  fields: FormFieldSchema[];
}

export interface FormSchema {
  groups?: FormGroupSchema[];
  fields?: FormFieldSchema[];
}

export interface SchemaFormProps {
  schema: FormSchema;
  value?: Record<string, unknown>;
  onChange?: (value: Record<string, unknown>) => void;
  onSubmit?: (value: Record<string, unknown>) => void;
  /** Submit button label (hidden when undefined). */
  submitText?: string;
  /** Layout columns (default 1). */
  columns?: 1 | 2 | 3;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

function normalizeSchema(schema: FormSchema): FormGroupSchema[] {
  if (schema.groups && schema.groups.length > 0) return schema.groups;
  if (schema.fields && schema.fields.length > 0) {
    return [{ key: "_default", fields: schema.fields }];
  }
  return [];
}

/** Apply dependency `then` overrides when a dependency field matches `when`. */
function applyDependencies(
  field: FormFieldSchema,
  formData: Record<string, unknown>,
): FormFieldSchema {
  if (!field.dependencies || field.dependencies.length === 0) return field;
  let merged = { ...field };
  for (const dep of field.dependencies) {
    const depValue = formData[dep.name];
    const match =
      dep.when === undefined
        ? depValue != null && depValue !== ""
        : JSON.stringify(depValue) === JSON.stringify(dep.when);
    if (match) {
      merged = { ...merged, ...dep.then };
    }
  }
  return merged;
}

function validateField(
  field: FormFieldSchema,
  value: unknown,
  formData: Record<string, unknown>,
): string | null {
  if (field.required) {
    const empty =
      value == null ||
      value === "" ||
      (Array.isArray(value) && value.length === 0);
    if (empty)
      return typeof field.required === "string"
        ? field.required
        : `${field.label}为必填项`;
  }
  for (const rule of field.rules ?? []) {
    if (rule.required) {
      const empty =
        value == null ||
        value === "" ||
        (Array.isArray(value) && value.length === 0);
      if (empty)
        return typeof rule.required === "string"
          ? rule.required
          : (rule.message ?? `${field.label}为必填项`);
    }
    if (rule.pattern) {
      const re =
        typeof rule.pattern === "string"
          ? new RegExp(rule.pattern)
          : rule.pattern;
      if (value != null && value !== "" && !re.test(String(value))) {
        return rule.message ?? `${field.label}格式不正确`;
      }
    }
    if (rule.min != null && typeof value === "number" && value < rule.min) {
      return rule.message ?? `${field.label}不能小于 ${rule.min}`;
    }
    if (rule.max != null && typeof value === "number" && value > rule.max) {
      return rule.message ?? `${field.label}不能大于 ${rule.max}`;
    }
    if (rule.validator) {
      const res = rule.validator(value, formData);
      if (res !== true) return res;
    }
  }
  return null;
}

/* ------------------------------------------------------------------ */
/*  Field renderer                                                      */
/* ------------------------------------------------------------------ */

interface FieldRendererProps {
  field: FormFieldSchema;
  value: unknown;
  error: string | null;
  labels?: Array<{ id: string; label: string }>;
  onChange: (v: unknown, labels?: Array<{ id: string; label: string }>) => void;
}

function FieldControl({
  field,
  value,
  labels,
  onChange,
  id,
}: Omit<FieldRendererProps, "error"> & { id: string }) {
  const { t } = useTranslation("ui");
  switch (field.type) {
    case "textarea":
      return (
        <Textarea
          id={id}
          value={(value as string) ?? ""}
          placeholder={field.placeholder}
          disabled={field.disabled}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case "number":
      return (
        <Input
          id={id}
          type="number"
          value={value == null ? "" : String(value)}
          placeholder={field.placeholder}
          disabled={field.disabled}
          onChange={(e) =>
            onChange(e.target.value === "" ? "" : Number(e.target.value))
          }
        />
      );
    case "select":
      return (
        <Select
          value={(value as string) ?? ""}
          disabled={field.disabled}
          onValueChange={(v) => onChange(v)}
        >
          <SelectTrigger id={id}>
            <SelectValue
              placeholder={
                field.placeholder ??
                t("schemaForm.select", { defaultValue: "请选择" })
              }
            />
          </SelectTrigger>
          <SelectContent>
            {(field.options ?? []).map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    case "multiSelect":
      return (
        <div className="flex flex-wrap gap-3">
          {(field.options ?? []).map((opt) => {
            const arr = (value as string[]) ?? [];
            const checked = arr.includes(opt.value);
            return (
              <label
                key={opt.value}
                className="flex items-center gap-1.5 text-sm"
              >
                <Checkbox
                  checked={checked}
                  disabled={field.disabled}
                  onCheckedChange={(c) => {
                    const next = c
                      ? [...arr, opt.value]
                      : arr.filter((v) => v !== opt.value);
                    onChange(next);
                  }}
                />
                {opt.label}
              </label>
            );
          })}
        </div>
      );
    case "checkbox":
      return (
        <Checkbox
          checked={value === true}
          disabled={field.disabled}
          onCheckedChange={(c) => onChange(c === true)}
        />
      );
    case "switch":
      return (
        <Switch
          checked={value === true}
          disabled={field.disabled}
          onCheckedChange={(c) => onChange(c === true)}
        />
      );
    case "radio":
      return (
        <RadioGroup
          value={(value as string) ?? ""}
          disabled={field.disabled}
          onValueChange={(v) => onChange(v)}
        >
          <div className="flex flex-wrap gap-3">
            {(field.options ?? []).map((opt) => (
              <label
                key={opt.value}
                className="flex items-center gap-1.5 text-sm"
              >
                <RadioGroupItem value={opt.value} />
                {opt.label}
              </label>
            ))}
          </div>
        </RadioGroup>
      );
    case "date":
      return (
        <DatePicker
          valueAsString
          value={(value as string) ?? null}
          disabled={field.disabled}
          placeholder={field.placeholder}
          onChange={(v) => onChange(v ?? "")}
        />
      );
    case "dateTime":
      return (
        <DateTimePicker
          valueAsString
          value={(value as string) ?? null}
          {...(field.disabled !== undefined
            ? { disabled: field.disabled }
            : {})}
          {...(field.placeholder ? { placeholder: field.placeholder } : {})}
          onChange={(v) => onChange(v ?? "")}
        />
      );
    case "browser":
      return (
        <BrowserField
          {...(field.browser ?? {})}
          {...(value != null ? { value: value as string | string[] } : {})}
          {...(labels ? { labels } : {})}
          {...(field.disabled !== undefined
            ? { disabled: field.disabled }
            : {})}
          onChange={(v, items) => {
            const nextLabels = items.map((item) => ({
              id: String(item.id),
              label: String(item.name ?? item.id),
            }));
            onChange(v, nextLabels);
          }}
        />
      );
    case "custom":
      return <>{field.render?.(value, onChange, field)}</>;
    case "upload":
      return (
        <Input
          type="file"
          disabled={field.disabled}
          onChange={(e) => {
            const files = Array.from(e.target.files ?? []);
            onChange(files);
          }}
        />
      );
    case "treeSelect":
    case "dateRange":
    case "text":
    default:
      return (
        <Input
          id={id}
          type="text"
          value={(value as string) ?? ""}
          placeholder={field.placeholder}
          disabled={field.disabled}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
}

function FieldRenderer({
  field,
  value,
  error,
  labels,
  onChange,
}: FieldRendererProps) {
  const fieldId = `sf-${field.name}`;
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5",
        field.colSpan === 2 && "sm:col-span-2",
        field.colSpan === 3 && "sm:col-span-3",
      )}
    >
      <Label htmlFor={fieldId}>
        {field.label}
        {field.required ? (
          <span className="text-destructive ml-0.5">*</span>
        ) : null}
      </Label>
      <FieldControl
        field={field}
        value={value}
        {...(labels ? { labels } : {})}
        onChange={onChange}
        id={fieldId}
      />
      {error && <span className="text-destructive text-xs">{error}</span>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SchemaForm                                                          */
/* ------------------------------------------------------------------ */

function SchemaForm({
  schema,
  value,
  onChange,
  onSubmit,
  submitText,
  columns = 1,
  className,
}: SchemaFormProps) {
  const { t } = useTranslation("ui");
  const groups = React.useMemo(() => normalizeSchema(schema), [schema]);

  const schemaDefaults = React.useMemo(() => {
    const defaults: Record<string, unknown> = {};
    for (const g of groups) {
      for (const f of g.fields) {
        if (f.defaultValue !== undefined) defaults[f.name] = f.defaultValue;
      }
    }
    return defaults;
  }, [groups]);

  const [internalData, setInternalData] = React.useState<
    Record<string, unknown>
  >(() => ({ ...schemaDefaults, ...(value ?? {}) }));
  const [labelMap, setLabelMap] = React.useState<
    Record<string, Array<{ id: string; label: string }>>
  >({});
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [collapsedGroups, setCollapsedGroups] = React.useState<
    Record<string, boolean>
  >(() => {
    const m: Record<string, boolean> = {};
    for (const g of groups) if (g.collapsed) m[g.key] = true;
    return m;
  });

  const isControlled = value !== undefined;
  const data = isControlled ? (value as Record<string, unknown>) : internalData;

  const setValue = (
    name: string,
    next: unknown,
    labels?: Array<{ id: string; label: string }>,
  ) => {
    const updated = { ...data, [name]: next };
    if (!isControlled) setInternalData(updated);
    if (labels) {
      setLabelMap((prev) => ({ ...prev, [name]: labels }));
    }
    onChange?.(updated);
    // clear field error on change
    if (errors[name]) {
      setErrors((prev) => {
        const cp = { ...prev };
        delete cp[name];
        return cp;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // validate all
    const newErrors: Record<string, string> = {};
    for (const g of groups) {
      for (const f of g.fields) {
        const resolved = applyDependencies(f, data);
        if (resolved.hidden) continue;
        const err = validateField(resolved, data[f.name], data);
        if (err) newErrors[f.name] = err;
      }
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onSubmit?.(data);
    }
  };

  const gridColsClass =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 3
        ? "sm:grid-cols-3"
        : "grid-cols-1";

  return (
    <div data-slot="schema-form" className={cn("w-full", className)}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          {groups.map((group) => {
            const collapsed = collapsedGroups[group.key];
            return (
              <Card key={group.key}>
                {group.title && (
                  <CardHeader>
                    <button
                      type="button"
                      className="flex items-center gap-1"
                      onClick={() =>
                        setCollapsedGroups((prev) => ({
                          ...prev,
                          [group.key]: !prev[group.key],
                        }))
                      }
                    >
                      {collapsed ? (
                        <ChevronRightIcon className="size-4" />
                      ) : (
                        <ChevronDownIcon className="size-4" />
                      )}
                      <CardTitle className="text-base">{group.title}</CardTitle>
                    </button>
                  </CardHeader>
                )}
                {!collapsed && (
                  <CardContent>
                    <div className={cn("grid gap-4", gridColsClass)}>
                      {group.fields.map((field) => {
                        const resolved = applyDependencies(field, data);
                        if (resolved.hidden) return null;
                        return (
                          <FieldRenderer
                            key={field.name}
                            field={resolved}
                            value={data[field.name]}
                            error={errors[field.name] ?? null}
                            {...(labelMap[field.name]
                              ? { labels: labelMap[field.name] }
                              : {})}
                            onChange={(v, labels) =>
                              setValue(field.name, v, labels)
                            }
                          />
                        );
                      })}
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
        {submitText !== undefined && onSubmit && (
          <CardFooter className="mt-4 justify-end">
            <Button type="submit">
              {submitText ?? t("schemaForm.submit", { defaultValue: "提交" })}
            </Button>
          </CardFooter>
        )}
      </form>
    </div>
  );
}

export { SchemaForm };
