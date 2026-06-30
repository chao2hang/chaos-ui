"use client";
import { cn } from "@/lib/utils";

/**
 * @component DepartmentPicker
 * @category Business
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <DepartmentPicker />
 * ```
 * 部门选择器(支持树形)
 */
export interface DepartmentPickerProps {
  className?: string;
}

function DepartmentPicker({ className }: DepartmentPickerProps) {
  return <div data-slot="department-picker" className={cn("", className)} />;
}

export { DepartmentPicker };
