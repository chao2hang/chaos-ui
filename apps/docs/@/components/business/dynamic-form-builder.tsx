"use client";

import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import { Input } from "@chaos_team/chaos-ui/ui";
import { Textarea } from "@chaos_team/chaos-ui/ui";
import { Label } from "@chaos_team/chaos-ui/ui";
import { Checkbox } from "@chaos_team/chaos-ui/ui";
import { Switch } from "@chaos_team/chaos-ui/ui";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@chaos_team/chaos-ui/ui";

/**
 * @component DynamicFormBuilder
 * @category business/bill
 * @since 0.7.0
 * @description 动态表单构建器 — renders form fields from a declarative schema.
 * @keywords dynamic, form, builder
 * @param schema Field definitions driving the rendered controls.
 * @param value Current form values keyed by field name.
 * @param onChange Callback fired when any field value changes.
 * @example
 * <DynamicFormBuilder
 *   schema={[{ name: "title", label: "标题", type: "text", required: true }]}
 * />
 */

interface DynamicFormBuilderFieldOption {
  value: string;
  label: string;
}

interface DynamicFormBuilderProps {
  schema: Array<{
    name: string;
    label: string;
    type: string;
    required?: boolean;
    options?: unknown[];
  }>;
  value?: Record<string, unknown>;
  onChange?: (val: Record<string, unknown>) => void;
  className?: string;
}

function DynamicFormBuilder({
  schema,
  value,
  onChange,
  className,
}: DynamicFormBuilderProps) {
  const valuesRef = React.useRef<Record<string, unknown>>(value ?? {});
  React.useEffect(() => {
    if (value) {
      valuesRef.current = value;
    }
  }, [value]);

  const update = React.useCallback(
    (name: string, next: unknown) => {
      const merged = { ...valuesRef.current, [name]: next };
      valuesRef.current = merged;
      onChange?.(merged);
    },
    [onChange],
  );

  const coerceOptions = (raw: unknown[] | undefined): DynamicFormBuilderFieldOption[] => {
    if (!raw || raw.length === 0) return [];
    return raw.map((o) => {
      if (typeof o === "string") return { value: o, label: o };
      if (o && typeof o === "object" && "value" in o) {
        const obj = o as { value: string; label?: string };
        return { value: String(obj.value), label: obj.label ?? String(obj.value) };
      }
      return { value: String(o), label: String(o) };
    });
  };

  return (
    <form
      data-slot="dynamic-form-builder"
      className={cn("flex flex-col gap-4", className)}
      onSubmit={(e) => e.preventDefault()}
    >
      {schema.length === 0 ? (
        <p className="text-sm text-muted-foreground">暂无字段</p>
      ) : (
        schema.map((field) => {
          const id = `dfb-${field.name}`;
          const current = valuesRef.current[field.name];
          const labelNode = (
            <Label htmlFor={id}>
              {field.label}
              {field.required ? <span className="ml-0.5 text-destructive">*</span> : null}
            </Label>
          );

          if (field.type === "select") {
            const opts = coerceOptions(field.options);
            return (
              <div key={field.name} className="flex flex-col gap-1.5">
                {labelNode}
                <Select
                  value={typeof current === "string" ? current : undefined}
                  onValueChange={(v) => update(field.name, v ?? "")}
                >
                  <SelectTrigger id={id}>
                    <SelectValue placeholder="请选择" />
                  </SelectTrigger>
                  <SelectContent>
                    {opts.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            );
          }

          if (field.type === "textarea") {
            return (
              <div key={field.name} className="flex flex-col gap-1.5">
                {labelNode}
                <Textarea
                  id={id}
                  value={typeof current === "string" ? current : ""}
                  onChange={(e) => update(field.name, e.target.value)}
                />
              </div>
            );
          }

          if (field.type === "checkbox") {
            return (
              <div key={field.name} className="flex items-center gap-2">
                <Checkbox
                  id={id}
                  checked={current === true}
                  onCheckedChange={(c) => update(field.name, c === true)}
                />
                <Label htmlFor={id}>{field.label}</Label>
              </div>
            );
          }

          if (field.type === "switch") {
            return (
              <div key={field.name} className="flex items-center justify-between gap-2">
                {labelNode}
                <Switch
                  checked={current === true}
                  onCheckedChange={(c) => update(field.name, c)}
                />
              </div>
            );
          }

          const inputType =
            field.type === "number" || field.type === "date" ? field.type : "text";
          return (
            <div key={field.name} className="flex flex-col gap-1.5">
              {labelNode}
              <Input
                id={id}
                type={inputType}
                value={
                  current === undefined || current === null
                    ? ""
                    : String(current)
                }
                onChange={(e) =>
                  update(
                    field.name,
                    field.type === "number" ? e.target.valueAsNumber : e.target.value,
                  )
                }
              />
            </div>
          );
        })
      )}
    </form>
  );
}

export { DynamicFormBuilder };
export type { DynamicFormBuilderProps };
