"use client";

import { cn } from "@/lib/utils";

/**
 * @component PrintTemplateBuilder
 * @category business/print
 * @since 0.7.0
 * @description 打印模板构建器
 * @keywords print, template, builder
 * @example
 * <PrintTemplateBuilder />
 */

interface PrintTemplateBuilderProps {
  template?: unknown;
  onChange?: (template: unknown) => void;
  className?: string;
}

function PrintTemplateBuilder({ className }: PrintTemplateBuilderProps) {
  return (
    <div data-slot="print-template-builder" className={cn("", className)}>
      {null}
    </div>
  );
}

export { PrintTemplateBuilder };
export type { PrintTemplateBuilderProps };
