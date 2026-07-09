"use client";

import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/format";
import { CheckCircleIcon, AlertCircleIcon } from "lucide-react";

/**
 * @component PriceMatchResult
 * @category business
 * @since 1.2.0
 * @description 价格来源审计展示 — 展示匹配层级（客户价 > 渠道价 > 出厂价）、
 * 命中价表名、fallback 提示。适用于流程 4b 价格来源审计。
 * / Price source audit display — shows matching hierarchy, hit price table,
 * and fallback hints.
 * @keywords price, match, audit, source, hierarchy, fallback
 * @example
 * <PriceMatchResult
 *   tiers={[
 *     { level: "客户专属价", tableName: "VIP客户价表", price: 8.5, matched: true },
 *     { level: "渠道价", tableName: "华东渠道价", price: 9.0, matched: false },
 *     { level: "出厂价", tableName: "标准出厂价", price: 10.0, matched: false },
 *   ]}
 *   currency="CNY"
 *   fallbackHint="未匹配到客户专属价，已使用渠道价"
 * />
 */

export interface PriceMatchTier {
  /** Price level name / 价格层级名称 */
  level: string;
  /** Price table name / 价表名称 */
  tableName?: string;
  /** Price value / 价格 */
  price: number;
  /** Whether this tier was matched / 是否命中 */
  matched: boolean;
  /** Extra metadata / 附加信息 */
  metadata?: Record<string, string>;
}

export interface PriceMatchResultProps {
  /** Price match tiers (ordered by priority) / 价格层级（按优先级排序） */
  tiers: PriceMatchTier[];
  /** Currency code / 货币代码 */
  currency?: string;
  /** Fallback hint when no exact match / 回退提示 */
  fallbackHint?: string;
  /** Whether price negotiation is allowed / 是否允许议价 */
  negotiable?: boolean;
  /** Extra className / 额外样式 */
  className?: string;
}

function PriceMatchResult({
  tiers,
  currency = "CNY",
  fallbackHint,
  negotiable = false,
  className,
}: PriceMatchResultProps) {
  const matchedTier = tiers.find((t) => t.matched);

  return (
    <div
      data-slot="price-match-result"
      className={cn("w-full space-y-3", className)}
    >
      {/* Matched price highlight */}
      {matchedTier && (
        <div className="flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/5 p-3">
          <CheckCircleIcon className="size-5 shrink-0 text-green-600" />
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold">
                {formatCurrency(matchedTier.price, currency)}
              </span>
              <span className="text-muted-foreground text-xs">
                {matchedTier.level}
              </span>
            </div>
            {matchedTier.tableName && (
              <p className="text-muted-foreground mt-0.5 text-xs">
                命中价表: {matchedTier.tableName}
              </p>
            )}
          </div>
          {negotiable && (
            <span className="rounded bg-blue-500/10 px-2 py-0.5 text-xs text-blue-600">
              可议价
            </span>
          )}
        </div>
      )}

      {/* Fallback hint */}
      {fallbackHint && !matchedTier && (
        <div className="flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <AlertCircleIcon className="size-5 shrink-0 text-amber-600" />
          <p className="text-sm text-amber-700">{fallbackHint}</p>
        </div>
      )}

      {/* Full hierarchy breakdown */}
      <div className="overflow-hidden rounded-lg border">
        <div className="bg-muted/50 border-b px-4 py-2">
          <h4 className="text-sm font-medium">价格匹配层级</h4>
        </div>
        <div className="divide-y">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5",
                tier.matched && "bg-green-500/5",
              )}
            >
              <div className="flex w-6 shrink-0 justify-center">
                {tier.matched ? (
                  <CheckCircleIcon className="size-4 text-green-600" />
                ) : (
                  <span className="text-muted-foreground/40 text-xs">
                    {index + 1}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "text-sm font-medium",
                      tier.matched
                        ? "text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    {tier.level}
                  </span>
                  {tier.tableName && (
                    <span className="text-muted-foreground text-xs">
                      ({tier.tableName})
                    </span>
                  )}
                </div>
                {tier.metadata &&
                  Object.entries(tier.metadata).map(([k, v]) => (
                    <p key={k} className="text-muted-foreground mt-0.5 text-xs">
                      {k}: {v}
                    </p>
                  ))}
              </div>
              <span
                className={cn(
                  "text-sm tabular-nums",
                  tier.matched
                    ? "font-bold text-green-700"
                    : "text-muted-foreground",
                )}
              >
                {formatCurrency(tier.price, currency)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { PriceMatchResult };
