"use client";

import { cn } from "@/lib/utils";

/**
 * @component FormDesignerRuntime
 * @category business/lowcode
 * @since 0.7.0
 * @description 表单设计器运行时
 * @keywords form, designer, runtime
 * @example
 * <FormDesignerRuntime />
 */

interface FormDesignerRuntimeProps {
  schema: unknown;
  value?: Record<string, unknown>;
  onChange?: (val: Record<string, unknown>) => void;
  className?: string;
}

function FormDesignerRuntime({ className }: FormDesignerRuntimeProps) {
  return (
    <div data-slot="form-designer-runtime" className={cn("", className)} />
  );
}

export { FormDesignerRuntime };
export type { FormDesignerRuntimeProps };
