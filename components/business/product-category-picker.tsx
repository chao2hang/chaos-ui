"use client";
import { cn } from "@/lib/utils";

/**
 * @component ProductCategoryPicker
 * @category Business
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <ProductCategoryPicker />
 * ```
 * 商品分类选择器(树形)
 */
export interface ProductCategoryPickerProps {
  className?: string;
}

function ProductCategoryPicker({ className }: ProductCategoryPickerProps) {
  return (
    <div data-slot="product-category-picker" className={cn("", className)} />
  );
}

export { ProductCategoryPicker };
