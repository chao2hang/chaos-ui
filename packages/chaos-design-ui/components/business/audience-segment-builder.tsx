"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { PlusIcon, Trash2Icon, UsersIcon } from "lucide-react";

export type SegmentOperator =
  | "equals"
  | "not_equals"
  | "contains"
  | "not_contains"
  | "gt"
  | "lt"
  | "between";

export interface SegmentRule {
  id: string;
  field: string;
  operator: SegmentOperator;
  value: string;
  value2?: string;
}

const operatorLabels: Record<SegmentOperator, string> = {
  equals: "等于",
  not_equals: "不等于",
  contains: "包含",
  not_contains: "不包含",
  gt: "大于",
  lt: "小于",
  between: "介于",
};

const fieldOptions = [
  { value: "age", label: "年龄" },
  { value: "gender", label: "性别" },
  { value: "city", label: "城市" },
  { value: "device", label: "设备" },
  { value: "last_purchase", label: "最近购买" },
];

interface AudienceSegmentBuilderProps extends React.ComponentProps<"div"> {
  rules: SegmentRule[];
  onChange?: (rules: SegmentRule[]) => void;
  className?: string;
}

let ruleId = 0;
function genId() {
  return `rule_${++ruleId}`;
}

function AudienceSegmentBuilder({
  rules,
  onChange,
  className,
  ...props
}: AudienceSegmentBuilderProps) {
  const handleAdd = () => {
    onChange?.([
      ...rules,
      { id: genId(), field: "age", operator: "equals", value: "" },
    ]);
  };

  const handleRemove = (id: string) => {
    onChange?.(rules.filter((r) => r.id !== id));
  };

  const handleChange = (id: string, patch: Partial<SegmentRule>) => {
    onChange?.(rules.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  };

  return (
    <div
      data-slot="audience-segment-builder"
      className={cn("space-y-3", className)}
      {...props}
    >
      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        <UsersIcon className="size-4" />
        <span>
          预估人数: {Math.floor(Math.random() * 100000).toLocaleString()}
        </span>
      </div>
      {rules.map((rule, i) => (
        <div key={rule.id} className="flex items-center gap-2">
          {i > 0 && (
            <span className="text-muted-foreground w-8 text-center text-xs font-medium">
              AND
            </span>
          )}
          {i === 0 && <span className="w-8" />}
          <Select
            value={rule.field}
            onValueChange={(v) => handleChange(rule.id, { field: v })}
          >
            <SelectTrigger className="h-9 w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fieldOptions.map((f) => (
                <SelectItem key={f.value} value={f.value}>
                  {f.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={rule.operator}
            onValueChange={(v) =>
              handleChange(rule.id, { operator: v as SegmentOperator })
            }
          >
            <SelectTrigger className="h-9 w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(operatorLabels).map(([k, v]) => (
                <SelectItem key={k} value={k}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            value={rule.value}
            onChange={(e) => handleChange(rule.id, { value: e.target.value })}
            className="h-9 min-w-[120px] flex-1"
            placeholder="值"
          />
          {rule.operator === "between" && (
            <Input
              value={rule.value2 ?? ""}
              onChange={(e) =>
                handleChange(rule.id, { value2: e.target.value })
              }
              className="h-9 w-[120px]"
              placeholder="结束值"
            />
          )}
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={() => handleRemove(rule.id)}
          >
            <Trash2Icon className="size-3.5" />
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={handleAdd}>
        <PlusIcon /> 添加条件
      </Button>
    </div>
  );
}

export { AudienceSegmentBuilder };
export type { AudienceSegmentBuilderProps, SegmentRule, SegmentOperator };
