"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TrashIcon, GiftIcon } from "lucide-react";
import { formatCurrency } from "@/lib/format";

/**
 * @component GiftLineEditor
 * @category business
 * @since 1.2.0
 * @description 赠品行编辑器 — 只读赠品行、高亮区分、来源政策标注、金额合计区分。
 * 适用于 M04 搭赠行/赠品行管理。
 * / Gift line editor — read-only gift rows, highlight differentiation,
 * policy source annotation, separate amount totals.
 * @keywords gift, bonus, free, line, editor, promotion, policy
 * @example
 * <GiftLineEditor
 *   value={[
 *     { id: "1", productName: "可乐 330ml", qty: 2, unit: "瓶", sourcePolicy: "满100送2", amount: 0 },
 *   ]}
 *   onChange={(lines) => setGifts(lines)}
 *   currency="CNY"
 * />
 */

export interface GiftLine {
  /** Unique ID / 唯一标识 */
  id: string;
  /** Product name / 商品名称 */
  productName: string;
  /** Quantity / 数量 */
  qty: number;
  /** Unit / 单位 */
  unit: string;
  /** Source policy description / 来源政策 */
  sourcePolicy?: string;
  /** Gift amount (0 for free gifts) / 赠品金额（0 表示免费） */
  amount: number;
  /** Whether the gift is free (amount=0) / 是否免费赠品 */
  isFree?: boolean;
}

export interface GiftLineEditorProps {
  /** Current gift lines / 当前赠品行 */
  value?: GiftLine[];
  /** Change callback / 变更回调 */
  onChange?: (lines: GiftLine[]) => void;
  /** Currency code / 货币代码 */
  currency?: string;
  /** Read-only mode / 只读模式 */
  readOnly?: boolean;
  /** Show total / 显示合计 */
  showTotal?: boolean;
  /** Extra className / 额外样式 */
  className?: string;
}

function GiftLineEditor({
  value: controlledValue,
  onChange,
  currency = "CNY",
  readOnly = false,
  showTotal = true,
  className,
}: GiftLineEditorProps) {
  const [lines, setLines] = React.useState<GiftLine[]>(controlledValue ?? []);

  React.useEffect(() => {
    if (controlledValue !== undefined) {
      setLines(controlledValue);
    }
  }, [controlledValue]);

  const removeLine = (id: string) => {
    const next = lines.filter((l) => l.id !== id);
    setLines(next);
    onChange?.(next);
  };

  const totalAmount = lines.reduce((sum, l) => sum + (l.amount || 0), 0);
  const totalQty = lines.reduce((sum, l) => sum + l.qty, 0);
  const freeCount = lines.filter((l) => l.isFree || l.amount === 0).length;

  return (
    <div data-slot="gift-line-editor" className={cn("w-full", className)}>
      {/* Gift lines */}
      <div className="space-y-2">
        {lines.length === 0 ? (
          <div className="text-muted-foreground flex items-center justify-center gap-2 rounded-lg border border-dashed py-8 text-sm">
            <GiftIcon className="size-4" />
            暂无赠品行
          </div>
        ) : (
          lines.map((line) => {
            const isFree = line.isFree || line.amount === 0;
            return (
              <div
                key={line.id}
                className={cn(
                  "flex items-center gap-3 rounded-lg border p-3 transition-colors",
                  isFree
                    ? "border-purple-500/30 bg-purple-500/5"
                    : "border-blue-500/30 bg-blue-500/5",
                )}
              >
                <div
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full",
                    isFree
                      ? "bg-purple-500/15 text-purple-600"
                      : "bg-blue-500/15 text-blue-600",
                  )}
                >
                  <GiftIcon className="size-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      {line.productName}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      × {line.qty} {line.unit}
                    </span>
                    {isFree && (
                      <span className="rounded bg-purple-500/15 px-1.5 py-0.5 text-[10px] font-medium text-purple-600">
                        免费赠品
                      </span>
                    )}
                  </div>
                  {line.sourcePolicy && (
                    <p className="text-muted-foreground mt-0.5 text-xs">
                      📋 来源政策: {line.sourcePolicy}
                    </p>
                  )}
                </div>
                <span
                  className={cn(
                    "shrink-0 text-sm font-medium tabular-nums",
                    isFree ? "text-purple-600" : "text-blue-600",
                  )}
                >
                  {isFree ? "免费" : formatCurrency(line.amount, currency)}
                </span>
                {!readOnly && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => removeLine(line.id)}
                    aria-label="删除赠品行"
                  >
                    <TrashIcon className="size-3.5" />
                  </Button>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Summary */}
      {showTotal && lines.length > 0 && (
        <div className="bg-muted/30 mt-3 flex items-center justify-between rounded-lg border p-3">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">
              共{" "}
              <span className="text-foreground font-medium">
                {lines.length}
              </span>{" "}
              行
            </span>
            <span className="text-muted-foreground">
              数量{" "}
              <span className="text-foreground font-medium">{totalQty}</span>
            </span>
            {freeCount > 0 && (
              <span className="text-purple-600">
                免费赠品 <span className="font-medium">{freeCount}</span>
              </span>
            )}
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-muted-foreground text-xs">合计</span>
            <span className="text-base font-bold tabular-nums">
              {formatCurrency(totalAmount, currency)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export { GiftLineEditor };
