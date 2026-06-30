"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
import { PlusIcon, Trash2Icon, ZapIcon } from "@/components/ui/icons";

/**
 * @component RuleEditor
 * @category business/lowcode
 * @since 0.7.0
 * @description 规则编辑器 — 可视化编辑条件规则（字段、操作符、值、动作），对外抛出 onChange。
 * @keywords rule, editor, lowcode, condition
 * @param rules 当前规则集合。
 * @param onChange 规则集合变化时回调。
 * @param className 根元素附加类名。
 * @example
 * <RuleEditor
 *   rules={[{ id: "r1", field: "amount", operator: ">", value: 1000, action: "approve" }]}
 * />
 */

/** 操作符选项。 */
const OPERATORS = [
  { value: "==", label: "等于" },
  { value: "!=", label: "不等于" },
  { value: ">", label: "大于" },
  { value: ">=", label: "大于等于" },
  { value: "<", label: "小于" },
  { value: "<=", label: "小于等于" },
  { value: "contains", label: "包含" },
  { value: "in", label: "属于" },
] as const;

/** 动作选项。 */
const ACTIONS = [
  { value: "approve", label: "通过" },
  { value: "reject", label: "驳回" },
  { value: "notify", label: "通知" },
  { value: "escalate", label: "上报" },
  { value: "skip", label: "跳过" },
] as const;

interface RuleItem {
  id: string;
  field: string;
  operator: string;
  value: unknown;
  action: string;
}

interface RuleEditorProps {
  rules: Array<RuleItem>;
  onChange?: (rules: unknown[]) => void;
  className?: string;
}

function RuleEditor({ rules = [], onChange, className }: RuleEditorProps) {
  const [items, setItems] = React.useState<RuleItem[]>(rules);

  // Keep internal state in sync when the controlled `rules` prop changes.
  React.useEffect(() => {
    setItems(rules);
  }, [rules]);

  const emit = React.useCallback(
    (next: RuleItem[]) => {
      setItems(next);
      onChange?.(next);
    },
    [onChange],
  );

  const addRule = () => {
    const next: RuleItem = {
      id: `rule-${Date.now()}`,
      field: "",
      operator: "==",
      value: "",
      action: "approve",
    };
    emit([...items, next]);
  };

  const updateRule = (id: string, patch: Partial<RuleItem>) => {
    emit(items.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  const removeRule = (id: string) => {
    emit(items.filter((r) => r.id !== id));
  };

  return (
    <div
      data-slot="rule-editor"
      className={cn("flex flex-col gap-4", className)}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ZapIcon className="size-4" aria-hidden />
            规则编辑器
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {items.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              暂无规则，请点击新增。
            </p>
          ) : (
            <ul role="list" className="flex flex-col gap-2">
              {items.map((rule, index) => {
                const operatorLabel =
                  OPERATORS.find((o) => o.value === rule.operator)?.label ??
                  rule.operator;
                const actionLabel =
                  ACTIONS.find((a) => a.value === rule.action)?.label ??
                  rule.action;
                return (
                  <li
                    key={rule.id}
                    className="flex flex-col gap-2 rounded-md border p-2 sm:flex-row sm:items-center"
                  >
                    <Badge variant="outline" className="shrink-0">
                      #{index + 1}
                    </Badge>
                    <Input
                      type="text"
                      value={rule.field}
                      placeholder="字段名"
                      aria-label={`规则 ${index + 1} 字段`}
                      className="sm:max-w-[10rem]"
                      onChange={(event) =>
                        updateRule(rule.id, { field: event.target.value })
                      }
                    />
                    <Select
                      value={rule.operator}
                      onValueChange={(value) => {
                        if (typeof value === "string") {
                          updateRule(rule.id, { operator: value });
                        }
                      }}
                    >
                      <SelectTrigger
                        aria-label={`规则 ${index + 1} 操作符`}
                        className="sm:w-[8rem]"
                      >
                        <SelectValue>{operatorLabel}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {OPERATORS.map((o) => (
                          <SelectItem key={o.value} value={o.value}>
                            {o.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="text"
                      value={
                        rule.value === undefined || rule.value === null
                          ? ""
                          : String(rule.value)
                      }
                      placeholder="比较值"
                      aria-label={`规则 ${index + 1} 值`}
                      className="sm:max-w-[10rem]"
                      onChange={(event) =>
                        updateRule(rule.id, { value: event.target.value })
                      }
                    />
                    <Select
                      value={rule.action}
                      onValueChange={(value) => {
                        if (typeof value === "string") {
                          updateRule(rule.id, { action: value });
                        }
                      }}
                    >
                      <SelectTrigger
                        aria-label={`规则 ${index + 1} 动作`}
                        className="sm:w-[8rem]"
                      >
                        <SelectValue>{actionLabel}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {ACTIONS.map((a) => (
                          <SelectItem key={a.value} value={a.value}>
                            {a.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => removeRule(rule.id)}
                      aria-label={`删除规则 ${index + 1}`}
                      className="sm:ml-auto"
                    >
                      <Trash2Icon />
                    </Button>
                  </li>
                );
              })}
            </ul>
          )}
          <div>
            <Button type="button" onClick={addRule}>
              <PlusIcon />
              新增规则
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            共 {items.length} 条规则。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export { RuleEditor };
export type { RuleEditorProps, RuleItem };
