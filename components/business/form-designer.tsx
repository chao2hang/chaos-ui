"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  GripVerticalIcon,
  PlusIcon,
  Trash2Icon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@/components/ui/icons";

/**
 * @component FormDesigner
 * @category business/lowcode
 * @since 0.7.0
 * @description 表单设计器 — 可视化编辑表单字段定义（类型、标签、必填），并对外抛出 onChange。
 * @keywords form, designer, lowcode
 * @param fields 当前表单字段集合。
 * @param onChange 字段集合变化时回调。
 * @param className 根元素附加类名。
 * @example
 * <FormDesigner
 *   fields={[{ id: "1", type: "text", label: "客户名称", required: true }]}
 *   onChange={(f) => console.log(f)}
 * />
 */

/** 字段类型选项。 */
const FIELD_TYPES = [
  { value: "text", label: "单行文本" },
  { value: "textarea", label: "多行文本" },
  { value: "number", label: "数字" },
  { value: "select", label: "下拉选择" },
  { value: "date", label: "日期" },
  { value: "checkbox", label: "开关" },
] as const;

interface FormDesignerField {
  id: string;
  type: string;
  label: string;
  required?: boolean;
}

interface FormDesignerProps {
  fields: Array<FormDesignerField>;
  onChange?: (fields: unknown[]) => void;
  className?: string;
}

function FormDesigner({
  fields = [],
  onChange,
  className,
}: FormDesignerProps) {
  const [items, setItems] = React.useState<FormDesignerField[]>(fields);
  const [labelDraft, setLabelDraft] = React.useState("");

  // Keep internal state in sync when the controlled `fields` prop changes.
  React.useEffect(() => {
    setItems(fields);
  }, [fields]);

  const emit = React.useCallback(
    (next: FormDesignerField[]) => {
      setItems(next);
      onChange?.(next);
    },
    [onChange],
  );

  const addField = () => {
    const label = labelDraft.trim() || `字段 ${items.length + 1}`;
    const next: FormDesignerField = {
      id: `field-${Date.now()}`,
      type: "text",
      label,
      required: false,
    };
    emit([...items, next]);
    setLabelDraft("");
  };

  const updateField = (id: string, patch: Partial<FormDesignerField>) => {
    emit(items.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  };

  const removeField = (id: string) => {
    emit(items.filter((f) => f.id !== id));
  };

  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    const a = next[index];
    const b = next[target];
    if (!a || !b) return;
    next[index] = b;
    next[target] = a;
    emit(next);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addField();
    }
  };

  return (
    <div
      data-slot="form-designer"
      className={cn("flex flex-col gap-4", className)}
    >
      <Card>
        <CardHeader>
          <CardTitle>表单设计器</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* 新增字段输入行 */}
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={labelDraft}
              placeholder="输入字段标签后回车新增"
              onChange={(event) => setLabelDraft(event.target.value)}
              onKeyDown={onKeyDown}
              aria-label="新字段标签"
            />
            <Button type="button" onClick={addField} aria-label="新增字段">
              <PlusIcon />
              新增
            </Button>
          </div>

          {/* 字段列表 */}
          {items.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              暂无字段，请在上方添加。
            </p>
          ) : (
            <ul role="list" className="flex flex-col gap-2">
              {items.map((field, index) => {
                const typeLabel =
                  FIELD_TYPES.find((t) => t.value === field.type)?.label ??
                  field.type;
                return (
                  <li
                    key={field.id}
                    className="flex items-center gap-2 rounded-md border p-2"
                  >
                    <GripVerticalIcon
                      className="size-4 shrink-0 text-muted-foreground"
                      aria-hidden
                    />
                    <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
                      <Input
                        type="text"
                        value={field.label}
                        aria-label={`字段 ${index + 1} 标签`}
                        className="sm:max-w-[12rem]"
                        onChange={(event) =>
                          updateField(field.id, {
                            label: event.target.value,
                          })
                        }
                      />
                      <Select
                        value={field.type}
                        onValueChange={(value) => {
                          if (typeof value === "string") {
                            updateField(field.id, { type: value });
                          }
                        }}
                      >
                        <SelectTrigger
                          aria-label={`字段 ${index + 1} 类型`}
                          className="sm:w-[10rem]"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {FIELD_TYPES.map((t) => (
                            <SelectItem key={t.value} value={t.value}>
                              {t.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <label className="flex items-center gap-1.5 text-sm">
                        <Checkbox
                          checked={!!field.required}
                          onCheckedChange={(checked) =>
                            updateField(field.id, {
                              required: checked === true,
                            })
                          }
                          aria-label={`字段 ${index + 1} 必填`}
                        />
                        <span className="text-muted-foreground">必填</span>
                      </label>
                      <Badge variant="secondary">{typeLabel}</Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        disabled={index === 0}
                        onClick={() => move(index, -1)}
                        aria-label={`上移字段 ${index + 1}`}
                      >
                        <ChevronUpIcon />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        disabled={index === items.length - 1}
                        onClick={() => move(index, 1)}
                        aria-label={`下移字段 ${index + 1}`}
                      >
                        <ChevronDownIcon />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => removeField(field.id)}
                        aria-label={`删除字段 ${index + 1}`}
                      >
                        <Trash2Icon />
                      </Button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          <p className="text-xs text-muted-foreground">
            共 {items.length} 个字段。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export { FormDesigner };
export type { FormDesignerProps, FormDesignerField };
