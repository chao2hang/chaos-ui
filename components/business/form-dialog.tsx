"use client";

import * as React from "react";
import { Button } from "@/components/ui";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { DatePicker } from "@/components/ui/date-picker";

/**
 * Field schema for FormDialog.
 * Named FormDialogField to avoid clashing with RHF `FormField`.
 * / FormDialog 字段描述（避免与 RHF FormField 撞名）
 */
export interface FormDialogField {
  key: string;
  label: string;
  type?: "input" | "select" | "number" | "date" | "textarea" | "custom";
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
  render?: (
    value: unknown,
    onChange: (val: unknown) => void,
  ) => React.ReactNode;
  defaultValue?: unknown;
}

/** @deprecated Use FormDialogField. Kept for CrudPage compatibility. */
export type FormField = FormDialogField;

export interface FormDialogProps {
  open?: boolean | undefined;
  onOpenChange?: ((open: boolean) => void) | undefined;
  title: string;
  fields: FormDialogField[];
  record?: Record<string, unknown> | null | undefined;
  onSubmit?: ((values: Record<string, unknown>) => void) | undefined;
  /** Confirm button label / 确定按钮文案 */
  confirmLabel?: string | undefined;
  /** Cancel button label / 取消按钮文案 */
  cancelLabel?: string | undefined;
  className?: string | undefined;
}

/**
 * @component FormDialog
 * @category business/crud
 * @since 1.5.0
 * @description Schema-driven create/edit dialog. Remount via `key` when
 * switching create/edit to avoid useEffect setState.
 * / 基于字段 schema 的新增/编辑弹窗。切换创建/编辑时用 key remount。
 * @keywords form, dialog, modal, crud, schema
 * @example
 * <FormDialog
 *   open={open}
 *   onOpenChange={setOpen}
 *   title="新增公司"
 *   fields={[{ key: "name", label: "名称", required: true }]}
 *   onSubmit={handleSubmit}
 * />
 */
export function FormDialog({
  open,
  onOpenChange,
  title,
  fields,
  record,
  onSubmit,
  confirmLabel = "确定",
  cancelLabel = "取消",
  className,
}: FormDialogProps) {
  const initial = React.useMemo(() => {
    if (record) return { ...record };
    const init: Record<string, unknown> = {};
    fields.forEach((f) => {
      if (f.defaultValue !== undefined) init[f.key] = f.defaultValue;
    });
    return init;
  }, [record, fields]);

  const [values, setValues] = React.useState(initial);

  const handleChange = (key: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const renderField = (field: FormDialogField) => {
    if (field.render) {
      return field.render(values[field.key], (val) =>
        handleChange(field.key, val),
      );
    }

    const value = values[field.key];

    if (field.type === "select" && field.options) {
      return (
        <select
          className="bg-background h-9 w-full rounded-md border px-3 text-sm"
          value={String(value ?? "")}
          onChange={(e) => handleChange(field.key, e.target.value || undefined)}
        >
          <option value="">
            {field.placeholder || `请选择${field.label}`}
          </option>
          {field.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    if (field.type === "textarea") {
      return (
        <textarea
          className="bg-background min-h-[80px] w-full rounded-md border px-3 py-2 text-sm"
          placeholder={field.placeholder}
          value={String(value ?? "")}
          onChange={(e) => handleChange(field.key, e.target.value)}
        />
      );
    }

    if (field.type === "number") {
      return (
        <input
          type="number"
          className="bg-background h-9 w-full rounded-md border px-3 text-sm"
          placeholder={field.placeholder}
          value={value != null ? String(value) : ""}
          onChange={(e) =>
            handleChange(field.key, e.target.valueAsNumber || undefined)
          }
        />
      );
    }

    if (field.type === "date") {
      return (
        <DatePicker
          valueAsString
          value={(value as string | null | undefined) ?? null}
          onChange={(next) => handleChange(field.key, next ?? undefined)}
          placeholder={field.placeholder ?? "YYYY-MM-DD"}
          allowClear
          className="w-full"
        />
      );
    }

    return (
      <input
        className="bg-background h-9 w-full rounded-md border px-3 text-sm"
        placeholder={field.placeholder}
        value={String(value ?? "")}
        onChange={(e) => handleChange(field.key, e.target.value)}
      />
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={className ?? "sm:max-w-[560px]"}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          {fields.map((field) => (
            <div key={field.key} className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">
                {field.label}
                {field.required && <span className="ml-1 text-red-500">*</span>}
              </label>
              {renderField(field)}
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange?.(false)}>
            {cancelLabel}
          </Button>
          <Button onClick={() => onSubmit?.(values)}>{confirmLabel}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
