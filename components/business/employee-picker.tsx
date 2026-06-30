"use client";
import { cn } from "@/lib/utils";

/**
 * @component EmployeePicker
 * @category Business
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <EmployeePicker />
 * ```
 * 员工选择器
 */
export interface EmployeePickerProps {
  className?: string;
}

function EmployeePicker({ className }: EmployeePickerProps) {
  return <div data-slot="employee-picker" className={cn("", className)} />;
}

export { EmployeePicker };
