"use client";
import { cn } from "@/lib/utils";

/**
 * @component WarehousePicker
 * @category Business
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <WarehousePicker />
 * ```
 * 仓库选择器
 */
export interface WarehousePickerProps {
  className?: string;
}

function WarehousePicker({ className }: WarehousePickerProps) {
  return <div data-slot="warehouse-picker" className={cn("", className)} />;
}

export { WarehousePicker };
