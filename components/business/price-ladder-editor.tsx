"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon, TrashIcon } from "lucide-react";
import { formatCurrency } from "@/lib/format";

/**
 * @component PriceLadderEditor
 * @category business
 * @since 1.2.0
 * @description 阶梯定价编辑器 — 添加/删除阶梯行、自动降序排列、实时预览、
 * min_qty 校验。适用于 M03 阶梯定价（买 10 箱以上 ¥8/箱）。
 * / Tiered pricing editor — add/remove rows, auto-sort by min_qty desc,
 * live preview, min_qty validation.
 * @keywords price, ladder, tier, step, pricing, editor
 * @example
 * <PriceLadderEditor
 *   value={[
 *     { minQty: 1, price: 10, unit: "箱" },
 *     { minQty: 10, price: 8, unit: "箱" },
 *   ]}
 *   onChange={(tiers) => setTiers(tiers)}
 *   currency="CNY"
 * />
 */

export interface PriceLadderTier {
  /** Minimum quantity for this tier / 起始数量 */
  minQty: number;
  /** Unit price for this tier / 单价 */
  price: number;
  /** Unit label (e.g. 箱/件/个) / 单位 */
  unit?: string;
}

export interface PriceLadderEditorProps {
  /** Current tiers / 当前阶梯数据 */
  value?: PriceLadderTier[];
  /** Change callback / 变更回调 */
  onChange?: (tiers: PriceLadderTier[]) => void;
  /** Currency code / 货币代码 */
  currency?: string;
  /** Unit options / 单位选项 */
  unitOptions?: string[];
  /** Default unit / 默认单位 */
  defaultUnit?: string;
  /** Disabled / 是否禁用 */
  disabled?: boolean;
  /** Show live preview / 显示实时预览 */
  showPreview?: boolean;
  /** Max tiers / 最大阶梯数 */
  maxTiers?: number;
  /** Extra className / 额外样式 */
  className?: string;
}

function PriceLadderEditor({
  value: controlledValue,
  onChange,
  currency = "CNY",
  unitOptions = ["箱", "件", "个", "瓶"],
  defaultUnit = "箱",
  disabled = false,
  showPreview = true,
  maxTiers = 10,
  className,
}: PriceLadderEditorProps) {
  const [tiers, setTiers] = React.useState<PriceLadderTier[]>(
    controlledValue ?? [{ minQty: 1, price: 0, unit: defaultUnit }],
  );
  const [errors, setErrors] = React.useState<Record<number, string>>({});

  // Sync external value
  React.useEffect(() => {
    if (controlledValue !== undefined) {
      setTiers(controlledValue);
    }
  }, [controlledValue]);

  const update = (next: PriceLadderTier[]) => {
    // Auto-sort by minQty descending (higher qty = lower price)
    const sorted = [...next].sort((a, b) => b.minQty - a.minQty);
    setTiers(sorted);
    onChange?.(sorted);
  };

  const addTier = () => {
    if (tiers.length >= maxTiers) return;
    const lastMinQty = tiers[tiers.length - 1]?.minQty ?? 0;
    update([...tiers, { minQty: lastMinQty + 1, price: 0, unit: defaultUnit }]);
  };

  const removeTier = (index: number) => {
    update(tiers.filter((_, i) => i !== index));
  };

  const updateTier = (index: number, patch: Partial<PriceLadderTier>) => {
    const next = tiers.map((t, i) => (i === index ? { ...t, ...patch } : t));
    // Validate minQty
    const newErrors: Record<number, string> = {};
    next.forEach((t, i) => {
      if (t.minQty < 1) newErrors[i] = "数量需 ≥ 1";
      // Check duplicate minQty
      if (next.some((o, j) => j !== i && o.minQty === t.minQty)) {
        newErrors[i] = "数量重复";
      }
    });
    setErrors(newErrors);
    update(next);
  };

  return (
    <div
      data-slot="price-ladder-editor"
      className={cn("w-full space-y-3", className)}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">阶梯定价</h4>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addTier}
          disabled={disabled || tiers.length >= maxTiers}
        >
          <PlusIcon className="size-3.5" /> 添加阶梯
        </Button>
      </div>

      {/* Tier rows */}
      <div className="space-y-2">
        {tiers.map((tier, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-muted-foreground shrink-0 text-xs whitespace-nowrap">
              满
            </span>
            <Input
              type="number"
              min={1}
              value={tier.minQty}
              disabled={disabled}
              onChange={(e) =>
                updateTier(index, { minQty: Number(e.target.value) || 0 })
              }
              className={cn("w-20", errors[index] && "border-destructive")}
            />
            <select
              value={tier.unit ?? defaultUnit}
              disabled={disabled}
              onChange={(e) => updateTier(index, { unit: e.target.value })}
              className="border-input bg-background h-9 rounded-md border px-2 text-sm"
            >
              {unitOptions.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
            <span className="text-muted-foreground shrink-0 text-xs">单价</span>
            <Input
              type="number"
              min={0}
              step="0.01"
              value={tier.price}
              disabled={disabled}
              onChange={(e) =>
                updateTier(index, { price: Number(e.target.value) || 0 })
              }
              className="w-24"
            />
            <span className="text-muted-foreground shrink-0 text-xs">
              {currency}/unit
            </span>
            {tiers.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => removeTier(index)}
                disabled={disabled}
                aria-label="删除阶梯"
              >
                <TrashIcon className="size-3.5" />
              </Button>
            )}
            {errors[index] && (
              <span className="text-destructive text-xs">{errors[index]}</span>
            )}
          </div>
        ))}
      </div>

      {/* Live preview */}
      {showPreview && tiers.length > 0 && (
        <div className="bg-muted/50 rounded-lg border p-3">
          <p className="text-muted-foreground mb-1.5 text-xs font-medium">
            预览
          </p>
          <div className="space-y-1">
            {tiers.map((tier, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-muted-foreground">
                  {i === tiers.length - 1
                    ? `≥ ${tier.minQty} ${tier.unit ?? defaultUnit}`
                    : `${tier.minQty}–${tiers[i + 1]?.minQty ?? "∞"} ${tier.unit ?? defaultUnit}`}
                </span>
                <span className="font-medium">
                  {formatCurrency(tier.price, currency)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export { PriceLadderEditor };
