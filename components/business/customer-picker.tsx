"use client";
import { cn } from "@/lib/utils";

/**
 * @component CustomerPicker
 * @category Business
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <CustomerPicker />
 * ```
 * 客户选择器(含经销商/终端)
 */
export interface CustomerPickerProps {
  className?: string;
}

function CustomerPicker({ className }: CustomerPickerProps) {
  return <div data-slot="customer-picker" className={cn("", className)} />;
}

export { CustomerPicker };
