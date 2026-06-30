"use client";

import { cn } from "@/lib/utils";

/**
 * @component BillTodoList
 * @category business/bill
 * @since 0.7.0
 * @description 单据待办列表
 * @keywords bill, todo, list
 * @example
 * <BillTodoList />
 */

interface BillTodoListProps {
  items: Array<{ id: string; title: string; type: string; deadline?: string }>;
  onItemClick?: (id: string) => void;
  className?: string;
}

function BillTodoList({ className }: BillTodoListProps) {
  return (
    <div data-slot="bill-todo-list" className={cn("", className)}>
      {null}
    </div>
  );
}

export { BillTodoList };
export type { BillTodoListProps };
