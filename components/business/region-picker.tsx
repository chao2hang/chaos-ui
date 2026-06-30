"use client";
import { cn } from "@/lib/utils";

/**
 * @component RegionPicker
 * @category Business
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <RegionPicker />
 * ```
 * 行政区划选择器(树形级联)
 */
export interface RegionPickerProps {
  className?: string;
}

function RegionPicker({ className }: RegionPickerProps) {
  return <div data-slot="region-picker" className={cn("", className)} />;
}

export { RegionPicker };
