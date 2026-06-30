"use client";
import { cn } from "@/lib/utils";

/**
 * @component TreeCrudPage
 * @category Business
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <TreeCrudPage />
 * ```
 * 左树右表 CRUD
 */
export interface TreeCrudPageProps {
  className?: string;
}

function TreeCrudPage({ className }: TreeCrudPageProps) {
  return <div data-slot="tree-crud-page" className={cn("", className)} />;
}

export { TreeCrudPage };
