"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * @component FormDesignerRuntime
 * @category business/lowcode
 * @since 0.7.0
 * @description 表单设计器运行时 — 依据 schema 渲染可填写的表单，并对外抛出 onChange。
 * @keywords form, designer, runtime, render
 * @param schema 表单字段定义集合。
 * @param value 当前表单数据。
 * @param onChange 表单数据变化时回调。
 * @param className 根元素附加类名。
 * @example
 * <FormDesignerRuntime
 *   schema={[{ id: "name", type: "text", label: "姓名", required: true }]}
 *   value={{ name: "张三" }}
 * />
 */

/** 运行时表单字段定义。 */
interface RuntimeField {
  id: string;
  type: "text" | "textarea" | "number" | "select" | "checkbox" | "date";
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
}

/** schema 的合法形态：字段数组或包含 fields 的对象。 */
type SchemaShape = RuntimeField[] | { fields: RuntimeField[] };

function normalizeSchema(schema: unknown): RuntimeField[] {
  const shape = schema as SchemaShape | undefined;
  if (Array.isArray(shape)) return shape;
  if (shape && typeof shape === "object" && Array.isArray(shape.fields)) {
    return shape.fields;
  }
  return [];
}

interface FormDesignerRuntimeProps {
  schema: unknown;
  value?: Record<string, unknown>;
  onChange?: (val: Record<string, unknown>) => void;
  className?: string;
}

function FormDesignerRuntime({
  schema,
  value = {},
  onChange,
  className,
}: FormDesignerRuntimeProps) {
  const fields = normalizeSchema(schema);
  const [data, setData] = React.useState<Record<string, unknown>>(value);

  // Keep internal state in sync when the controlled `value` prop changes.
  React.useEffect(() => {
    setData(value);
  }, [value]);

  const setValue = (id: string, next: unknown) => {
    const updated = { ...data, [id]: next };
    setData(updated);
    onChange?.(updated);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onChange?.(data);
  };

  return (
    <div
      data-slot="form-designer-runtime"
      className={cn("w-full", className)}
    >
      <Card>
        <CardHeader>
          <CardTitle>表单填写</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="flex flex-col gap-4">
            {fields.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                暂无可填写的字段。
              </p>
            ) : (
              <ul role="list" className="flex flex-col gap-4">
                {fields.map((field) => {
                  const val = data[field.id];
                  const control = () => {
                    switch (field.type) {
                      case "textarea":
                        return (
                          <Textarea
                            value={(val as string) ?? ""}
                            placeholder={field.placeholder}
                            aria-label={field.label}
                            onChange={(event) =>
                              setValue(field.id, event.target.value)
                            }
                          />
                        );
                      case "number":
                        return (
                          <Input
                            type="number"
                            value={
                              val === undefined || val === null
                                ? ""
                                : String(val)
                            }
                            placeholder={field.placeholder}
                            aria-label={field.label}
                            onChange={(event) => {
                              const raw = event.target.value;
                              setValue(
                                field.id,
                                raw === "" ? "" : Number(raw),
                              );
                            }}
                          />
                        );
                      case "checkbox":
                        return (
                          <Checkbox
                            checked={val === true}
                            aria-label={field.label}
                            onCheckedChange={(checked) =>
                              setValue(field.id, checked === true)
                            }
                          />
                        );
                      case "select":
                        return (
                          <Select
                            value={(val as string) ?? ""}
                            onValueChange={(v) => setValue(field.id, v)}
                          >
                            <SelectTrigger aria-label={field.label}>
                              <SelectValue
                                placeholder={field.placeholder ?? "请选择"}
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
                      case "date":
                        return (
                          <Input
                            type="date"
                            value={(val as string) ?? ""}
                            aria-label={field.label}
                            onChange={(event) =>
                              setValue(field.id, event.target.value)
                            }
                          />
                        );
                      case "text":
                      default:
                        return (
                          <Input
                            type="text"
                            value={(val as string) ?? ""}
                            placeholder={field.placeholder}
                            aria-label={field.label}
                            onChange={(event) =>
                              setValue(field.id, event.target.value)
                            }
                          />
                        );
                    }
                  };

                  return (
                    <li key={field.id} className="flex flex-col gap-1.5">
                      <Label htmlFor={field.id}>
                        {field.label}
                        {field.required ? (
                          <span className="ml-0.5 text-destructive">*</span>
                        ) : null}
                      </Label>
                      <div id={field.id}>{control()}</div>
                    </li>
                  );
                })}
              </ul>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit">提交</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export { FormDesignerRuntime };
export type { FormDesignerRuntimeProps, RuntimeField };
