"use client";
import { cn } from "@/lib/utils";

/**
 * @component PromotionRuleEditor
 * @category Business
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <PromotionRuleEditor />
 * ```
 * 促销规则编辑器
 */
export interface PromotionRuleEditorProps {
  className?: string;
}

function PromotionRuleEditor({ className }: PromotionRuleEditorProps) {
  return (
    <div data-slot="promotion-rule-editor" className={cn("", className)} />
  );
}

export { PromotionRuleEditor };
