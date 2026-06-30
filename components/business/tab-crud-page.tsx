"use client";
import { cn } from "@/lib/utils";

/**
 * @component TabCrudPage
 * @category Business
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <TabCrudPage />
 * ```
 * 标签页切换 CRUD
 */
export interface TabCrudPageProps {
  className?: string;
}

function TabCrudPage({ className }: TabCrudPageProps) {
  return <div data-slot="tab-crud-page" className={cn("", className)} />;
}

export { TabCrudPage };
