"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from "@/components/ui";
import { TagIcon, CalendarIcon, ClockIcon, EditIcon, CopyIcon } from "@/components/ui/icons";
import { formatPercent } from "@/lib/format";

/**
 * @component PromotionRuleCard
 * @category Business
 * @since 1.0.0-beta.0
 * @description 促销规则展示卡。展示促销名称、类型、生效时段、折扣力度与适用范围。
 * @param name 促销规则名称
 * @param type 促销类型（如 满减 / 折扣 / 买赠）
 * @param discount 折扣力度：满减为减免金额，折扣为 0~1 比例
 * @param startDate 生效开始日期（ISO 字符串）
 * @param endDate 生效结束日期（ISO 字符串）
 * @param scope 适用范围描述
 * @param active 是否生效中
 * @param onEdit 点击编辑回调
 * @param onDuplicate 复制规则回调
 * @example
 * ```tsx
 * <PromotionRuleCard name="满 200 减 30" type="满减" discount={30} active />
 * ```
 * 促销规则展示卡
 */

export interface PromotionRuleCardProps {
  /** 促销规则名称 */
  name?: string;
  /** 促销类型，如 满减 / 折扣 / 买赠 */
  type?: "满减" | "折扣" | "买赠" | "直降";
  /** 折扣力度：满减/直降为减免金额，折扣为 0~1 的比例 */
  discount?: number;
  /** 满减门槛金额 */
  threshold?: number;
  /** 生效开始日期（ISO 字符串） */
  startDate?: string;
  /** 生效结束日期（ISO 字符串） */
  endDate?: string;
  /** 适用范围描述 */
  scope?: string;
  /** 是否生效中 */
  active?: boolean;
  /** 点击编辑回调 */
  onEdit?: () => void;
  /** 复制规则回调 */
  onDuplicate?: () => void;
  className?: string;
}

function PromotionRuleCard({
  name = "未命名促销",
  type = "折扣",
  discount = 0,
  threshold,
  startDate,
  endDate,
  scope = "全部商品",
  active = false,
  onEdit,
  onDuplicate,
  className,
}: PromotionRuleCardProps) {
  const discountLabel =
    type === "折扣"
      ? formatPercent(discount)
      : type === "满减" || type === "直降"
        ? `减 ${discount}`
        : `赠 ${discount}`;

  return (
    <Card data-slot="promotion-rule-card" className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2 truncate">
            <TagIcon className="size-4 text-primary" />
            <span className="truncate">{name}</span>
          </span>
          {active ? (
            <Badge variant="default">生效中</Badge>
          ) : (
            <Badge variant="secondary">未生效</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm" role="list">
          <div className="flex items-center gap-1.5">
            <dt className="text-muted-foreground">类型</dt>
            <dd className="font-medium">{type}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt className="text-muted-foreground">力度</dt>
            <dd className="font-medium tabular-nums">{discountLabel}</dd>
          </div>
          {threshold !== undefined && (
            <div className="flex items-center gap-1.5">
              <dt className="text-muted-foreground">门槛</dt>
              <dd className="font-medium tabular-nums">满 {threshold}</dd>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <dt className="text-muted-foreground">范围</dt>
            <dd className="font-medium">{scope}</dd>
          </div>
        </dl>

        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <CalendarIcon /> {startDate ?? "即日起"}
          </span>
          <span className="inline-flex items-center gap-1">
            <ClockIcon /> 至 {endDate ?? "长期"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" size="sm" onClick={onEdit}>
            <EditIcon /> 编辑
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={onDuplicate}>
            <CopyIcon /> 复制
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export { PromotionRuleCard };
