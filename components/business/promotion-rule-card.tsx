"use client";
import { cn } from "@/lib/utils";

/**
 * @component PromotionRuleCard
 * @category Business
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <PromotionRuleCard />
 * ```
 * 促销规则展示卡
 */
export interface PromotionRuleCardProps {
  className?: string;
}

function PromotionRuleCard({ className }: PromotionRuleCardProps) {
  return <div data-slot="promotion-rule-card" className={cn("", className)} />;
}

export { PromotionRuleCard };
