"use client";
import { cn } from "@/lib/utils";

/**
 * @component SubformTabs
 * @category Business
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <SubformTabs />
 * ```
 * 子表单 tab
 */
export interface SubformTabsProps {
  className?: string;
}

function SubformTabs({ className }: SubformTabsProps) {
  return <div data-slot="subform-tabs" className={cn("", className)} />;
}

export { SubformTabs };
