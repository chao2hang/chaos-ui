"use client";
import { cn } from "@/lib/utils";
import { ChevronRightIcon, ClockIcon } from "@/components/ui";
import { formatDate } from "@/lib/format";
/**
 * @component BillTodoList
 * @category business/bill
 * @since 0.7.0
 * @description 单据待办列表
 */
interface BillTodoListProps {
  items: Array<{ id: string; title: string; type: string; deadline?: string }>;
  onItemClick?: (id: string) => void;
  className?: string;
}
function BillTodoList({
  items = [],
  onItemClick,
  className,
}: BillTodoListProps) {
  return (
    <ul
      data-slot="bill-todo-list"
      className={cn("flex flex-col gap-1", className)}
    >
      {items.map((it) => (
        <li key={it.id}>
          <button
            type="button"
            onClick={() => onItemClick?.(it.id)}
            className="hover:bg-muted/40 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm"
          >
            <span className="bg-muted text-muted-foreground rounded px-1.5 py-0.5 text-xs">
              {it.type}
            </span>
            <span className="flex-1 truncate">{it.title}</span>
            {it.deadline && (
              <span className="text-muted-foreground flex items-center gap-1 text-xs">
                <ClockIcon className="size-3" />
                {formatDate(it.deadline)}
              </span>
            )}
            <ChevronRightIcon className="text-muted-foreground size-4" />
          </button>
        </li>
      ))}
    </ul>
  );
}
export { BillTodoList };
export type { BillTodoListProps };
