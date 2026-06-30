"use client";
import { cn } from "@/lib/utils";

/**
 * @component PrintTemplateLayout
 * @category Layout
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <PrintTemplateLayout />
 * ```
 * 打印模板布局
 */
export interface PrintTemplateLayoutProps {
  className?: string;
}

function PrintTemplateLayout({ className }: PrintTemplateLayoutProps) {
  return (
    <div data-slot="print-template-layout" className={cn("", className)} />
  );
}

export { PrintTemplateLayout };
