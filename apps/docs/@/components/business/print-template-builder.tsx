"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button, Input } from "@/components/ui";
import {
  PlusIcon,
  Trash2Icon,
  FileTextIcon,
  GripVerticalIcon,
} from "@/components/ui/icons";

/**
 * @component PrintTemplateBuilder
 * @category business/print
 * @since 0.7.0
 * @description 打印模板构建器 — interactive editor for a structured print
 * template. Lets the user edit the template title and add/remove ordered
 * fields, emitting the updated template through `onChange`.
 * @keywords print, template, builder
 * @param template - the template to edit; defaults to an empty template
 * @param onChange - called with the updated template on every edit
 * @example
 * <PrintTemplateBuilder template={{ title: "Invoice", fields: [{ label: "客户" }] }} />
 */

/** A single field row in a print template. */
export interface PrintTemplateField {
  /** Field label shown on the printed document. */
  label: string;
  /** Optional bound data key the field maps to. */
  key?: string;
}

/** Structured print template edited by the builder. */
export interface PrintTemplateModel {
  /** Title rendered at the top of the printed document. */
  title: string;
  /** Ordered list of fields included on the template. */
  fields: PrintTemplateField[];
}

interface PrintTemplateBuilderProps {
  /** Template to edit. Defaults to an empty template. */
  template?: PrintTemplateModel;
  /** Receives the updated template on every edit. */
  onChange?: (template: PrintTemplateModel) => void;
  className?: string;
}

const defaultTemplate: PrintTemplateModel = { title: "", fields: [] };

function PrintTemplateBuilder({
  template,
  onChange,
  className,
}: PrintTemplateBuilderProps) {
  const value: PrintTemplateModel = React.useMemo(
    () => (template && template.title !== undefined && Array.isArray(template.fields) ? template : defaultTemplate),
    [template],
  );

  const update = React.useCallback(
    (next: PrintTemplateModel) => {
      onChange?.(next);
    },
    [onChange],
  );

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    update({ ...value, title: e.target.value });
  };

  const handleFieldLabel = (index: number, label: string) => {
    const fields = value.fields.map((f, i) => (i === index ? { ...f, label } : f));
    update({ ...value, fields });
  };

  const handleFieldKey = (index: number, key: string) => {
    const fields = value.fields.map((f, i) =>
      i === index ? { ...f, ...(key ? { key } : {}) } : f,
    );
    update({ ...value, fields });
  };

  const addField = () => {
    update({ ...value, fields: [...value.fields, { label: "" }] });
  };

  const removeField = (index: number) => {
    update({ ...value, fields: value.fields.filter((_, i) => i !== index) });
  };

  return (
    <div
      data-slot="print-template-builder"
      className={cn("flex flex-col gap-4 rounded-lg border bg-card p-4 text-card-foreground", className)}
    >
      <div className="flex items-center gap-2">
        <FileTextIcon className="size-5 text-muted-foreground" />
        <h3 className="text-sm font-semibold">打印模板构建器</h3>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="print-template-title" className="text-xs font-medium text-muted-foreground">
          模板标题
        </label>
        <Input
          id="print-template-title"
          type="text"
          value={value.title}
          placeholder="请输入模板标题"
          onChange={handleTitleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">字段列表</span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            icon={<PlusIcon />}
            onClick={addField}
          >
            添加字段
          </Button>
        </div>

        {value.fields.length === 0 ? (
          <p className="rounded-md border border-dashed bg-muted/40 px-3 py-4 text-center text-sm text-muted-foreground">
            暂无字段，点击“添加字段”开始构建模板
          </p>
        ) : (
          <ol role="list" className="flex flex-col gap-2">
            {value.fields.map((field, index) => (
              <li
                key={index}
                data-slot="print-template-field"
                className="flex items-center gap-2 rounded-md border bg-background p-2"
              >
                <GripVerticalIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                <span className="w-5 shrink-0 text-center text-xs tabular-nums text-muted-foreground">
                  {index + 1}
                </span>
                <Input
                  type="text"
                  value={field.label}
                  placeholder="字段标签"
                  aria-label={`字段 ${index + 1} 标签`}
                  className="flex-1"
                  onChange={(e) => handleFieldLabel(index, e.target.value)}
                />
                <Input
                  type="text"
                  value={field.key ?? ""}
                  placeholder="数据键名"
                  aria-label={`字段 ${index + 1} 键名`}
                  className="w-32"
                  onChange={(e) => handleFieldKey(index, e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`删除字段 ${index + 1}`}
                  onClick={() => removeField(index)}
                >
                  <Trash2Icon />
                </Button>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

export { PrintTemplateBuilder };
export type { PrintTemplateBuilderProps };
