"use client";
import { cn } from "@/lib/utils";

/**
 * @component CompanyPicker
 * @category Business
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <CompanyPicker />
 * ```
 * 公司选择器
 */
export interface CompanyPickerProps {
  className?: string;
}

function CompanyPicker({ className }: CompanyPickerProps) {
  return <div data-slot="company-picker" className={cn("", className)} />;
}

export { CompanyPicker };
