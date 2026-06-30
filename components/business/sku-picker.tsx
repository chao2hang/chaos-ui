"use client";
import { cn } from "@/lib/utils";

/**
 * @component SkuPicker
 * @category Business
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <SkuPicker />
 * ```
 * 商品/SKU 选择器
 */
export interface SkuPickerProps {
  className?: string;
}

function SkuPicker({ className }: SkuPickerProps) {
  return <div data-slot="sku-picker" className={cn("", className)} />;
}

export { SkuPicker };
