"use client";
import { cn } from "@/lib/utils";

/**
 * @component CostCenterPicker
 * @category Business
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <CostCenterPicker />
 * ```
 * 成本中心选择器
 */
export interface CostCenterPickerProps {
  className?: string;
}

function CostCenterPicker({ className }: CostCenterPickerProps) {
  return <div data-slot="cost-center-picker" className={cn("", className)} />;
}

export { CostCenterPicker };
