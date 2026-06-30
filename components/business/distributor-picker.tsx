"use client";
import { cn } from "@/lib/utils";

/**
 * @component DistributorPicker
 * @category Business
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <DistributorPicker />
 * ```
 * 经销商选择器
 */
export interface DistributorPickerProps {
  className?: string;
}

function DistributorPicker({ className }: DistributorPickerProps) {
  return <div data-slot="distributor-picker" className={cn("", className)} />;
}

export { DistributorPicker };
