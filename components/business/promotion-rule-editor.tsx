"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { PlusIcon, Trash2Icon, TagIcon } from "@/components/ui/icons";

/**
 * @component PromotionRuleEditor
 * @category Business
 * @since 1.0.0-beta.0
 * @description 促销规则编辑器 — define stacked promotion rules with thresholds and actions.
 * @example
 * ```tsx
 * <PromotionRuleEditor />
 * ```
 * 促销规则编辑器
 */

interface PromotionRule {
  id: string;
  name: string;
  /** Trigger threshold, e.g. order amount that must be reached. */
  threshold: number;
  /** Comparison operator applied to the threshold. */
  operator: "gte" | "lte" | "eq";
  /** Reward kind applied when the rule matches. */
  action: "discount" | "gift" | "coupon";
  /** Reward magnitude (percentage off, gift count, or coupon value). */
  amount: number;
}

interface PromotionRuleEditorProps {
  /** Initial rules. Defaults to a single empty starter rule. */
  rules?: PromotionRule[];
  /** Called with the current rules whenever they change. */
  onChange?: (rules: PromotionRule[]) => void;
  className?: string;
}

const DEFAULT_RULES: PromotionRule[] = [
  { id: "rule-1", name: "满99减10", threshold: 99, operator: "gte", action: "discount", amount: 10 },
];

function PromotionRuleEditor({
  rules = DEFAULT_RULES,
  onChange,
  className,
}: PromotionRuleEditorProps) {
  const [localRules, setLocalRules] = React.useState<PromotionRule[]>(rules);

  React.useEffect(() => {
    setLocalRules(rules);
  }, [rules]);

  const commit = (next: PromotionRule[]) => {
    setLocalRules(next);
    onChange?.(next);
  };

  const updateRule = <K extends keyof PromotionRule>(
    id: string,
    key: K,
    val: PromotionRule[K],
  ) => {
    commit(localRules.map((r) => (r.id === id ? { ...r, [key]: val } : r)));
  };

  const addRule = () => {
    const id = `rule-${Date.now()}`;
    commit([
      ...localRules,
      { id, name: "", threshold: 0, operator: "gte", action: "discount", amount: 0 },
    ]);
  };

  const removeRule = (id: string) => {
    commit(localRules.filter((r) => r.id !== id));
  };

  const actionLabel: Record<PromotionRule["action"], string> = {
    discount: "折扣",
    gift: "赠品",
    coupon: "优惠券",
  };

  return (
    <div
      data-slot="promotion-rule-editor"
      className={cn("flex flex-col gap-4", className)}
    >
      <div className="flex items-center gap-2">
        <TagIcon className="size-5 text-muted-foreground" aria-hidden />
        <h3 className="text-base font-medium">促销规则</h3>
      </div>

      <ol className="flex flex-col gap-3">
        {localRules.map((rule, idx) => (
          <li
            key={rule.id}
            className="flex flex-col gap-3 rounded-md border p-3"
          >
            <div className="flex items-center justify-between">
              <Badge variant="secondary">规则 {idx + 1}</Badge>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                aria-label={`删除规则 ${idx + 1}`}
                onClick={() => removeRule(rule.id)}
              >
                <Trash2Icon className="size-4" aria-hidden />
              </Button>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`pre-name-${rule.id}`}>规则名称</Label>
              <Input
                id={`pre-name-${rule.id}`}
                value={rule.name}
                placeholder="如：满199减30"
                onChange={(e) => updateRule(rule.id, "name", e.target.value)}
              />
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={`pre-threshold-${rule.id}`}>门槛</Label>
                <Input
                  id={`pre-threshold-${rule.id}`}
                  type="number"
                  value={Number.isFinite(rule.threshold) ? rule.threshold : 0}
                  onChange={(e) =>
                    updateRule(rule.id, "threshold", e.target.valueAsNumber)
                  }
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={`pre-operator-${rule.id}`}>比较</Label>
                <Select
                  value={rule.operator}
                  onValueChange={(v) =>
                    updateRule(rule.id, "operator", (v ?? "gte") as PromotionRule["operator"])
                  }
                >
                  <SelectTrigger id={`pre-operator-${rule.id}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gte">≥ 大于等于</SelectItem>
                    <SelectItem value="lte">≤ 小于等于</SelectItem>
                    <SelectItem value="eq">= 等于</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={`pre-action-${rule.id}`}>奖励类型</Label>
                <Select
                  value={rule.action}
                  onValueChange={(v) =>
                    updateRule(rule.id, "action", (v ?? "discount") as PromotionRule["action"])
                  }
                >
                  <SelectTrigger id={`pre-action-${rule.id}`}>
                    <SelectValue>{actionLabel[rule.action]}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discount">折扣</SelectItem>
                    <SelectItem value="gift">赠品</SelectItem>
                    <SelectItem value="coupon">优惠券</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={`pre-amount-${rule.id}`}>数值</Label>
                <Input
                  id={`pre-amount-${rule.id}`}
                  type="number"
                  value={Number.isFinite(rule.amount) ? rule.amount : 0}
                  onChange={(e) =>
                    updateRule(rule.id, "amount", e.target.valueAsNumber)
                  }
                />
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="flex justify-start">
        <Button type="button" variant="outline" size="sm" onClick={addRule}>
          <PlusIcon className="size-4" aria-hidden />
          新增规则
        </Button>
      </div>
    </div>
  );
}

export { PromotionRuleEditor };
export type { PromotionRuleEditorProps };
