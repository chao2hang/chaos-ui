"use client";

import { cn } from "@/lib/utils";

/**
 * @component DynamicFormBuilder
 * @category business/bill
 * @since 0.7.0
 * @description 动态表单构建器
 * @keywords dynamic, form, builder
 * @example
 * <DynamicFormBuilder />
 */

interface DynamicFormBuilderProps {
  schema: Array<{
    name: string;
    label: string;
    type: string;
    required?: boolean;
    options?: unknown[];
  }>;
  value?: Record<string, unknown>;
  onChange?: (val: Record<string, unknown>) => void;
  className?: string;
}

function DynamicFormBuilder({ className }: DynamicFormBuilderProps) {
  return (
    <div data-slot="dynamic-form-builder" className={cn("", className)}>
      {null}
    </div>
  );
}

export { DynamicFormBuilder };
export type { DynamicFormBuilderProps };
