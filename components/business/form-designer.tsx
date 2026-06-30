"use client";

import { cn } from "@/lib/utils";

/**
 * @component FormDesigner
 * @category business/lowcode
 * @since 0.7.0
 * @description 表单设计器
 * @keywords form, designer
 * @example
 * <FormDesigner />
 */

interface FormDesignerProps {
  fields: Array<{
    id: string;
    type: string;
    label: string;
    required?: boolean;
  }>;
  onChange?: (fields: unknown[]) => void;
  className?: string;
}

function FormDesigner({ className }: FormDesignerProps) {
  return <div data-slot="form-designer" className={cn("", className)} />;
}

export { FormDesigner };
export type { FormDesignerProps };
