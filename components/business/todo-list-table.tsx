"use client";
import { cn } from "@/lib/utils";

/**
 * @component TodoListTable
 * @category Business
 * @since 1.0.0-beta.0
 * @example
 * ```tsx
 * <TodoListTable />
 * ```
 * 待办事项表格
 */
export interface TodoListTableProps {
  className?: string;
}

function TodoListTable({ className }: TodoListTableProps) {
  return <div data-slot="todo-list-table" className={cn("", className)} />;
}

export { TodoListTable };
