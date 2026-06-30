"use client";
import { cn } from "@/lib/utils";

/**
 * @component KanbanColumn
 * @category Business
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <KanbanColumn />
 * ```
 * 看板列(单列)
 */
export interface KanbanColumnProps {
  className?: string;
}

function KanbanColumn({ className }: KanbanColumnProps) {
  return <div data-slot="kanban-column" className={cn("", className)} />;
}

export { KanbanColumn };
