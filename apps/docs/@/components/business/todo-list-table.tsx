"use client";

import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/format";
import {
  ClockIcon,
  FlagIcon,
  CheckIcon,
  CircleIcon,
} from "@/components/ui/icons";

/**
 * @component TodoListTable
 * @category business
 * @since 1.0.0-beta.0
 * @description 待办事项表格 — a checkbox-driven task table that lets users
 * toggle completion, see priority, and view deadlines. Renders a seeded
 * default list when no items are provided.
 * @example
 * ```tsx
 * <TodoListTable />
 * ```
 */
type TodoPriority = "high" | "medium" | "low";

interface TodoItem {
  id: string;
  title: string;
  /** Priority badge label, e.g. "高" / "中" / "低". */
  priority?: TodoPriority;
  /** ISO date string for the deadline, if any. */
  deadline?: string;
  /** Whether the item is already completed. */
  completed?: boolean;
}

interface TodoListTableProps {
  /** Todo items. Defaults to a small sample list so the table is never empty. */
  items?: TodoItem[];
  /** Called with the toggled item id whenever a checkbox is clicked. */
  onToggle?: (id: string) => void;
  className?: string;
}

const DEFAULT_ITEMS: TodoItem[] = [
  { id: "t1", title: "审核今日采购单", priority: "high" },
  { id: "t2", title: "复核库存盘点结果", priority: "medium" },
  { id: "t3", title: "提交月度财务报表", priority: "low" },
];

const PRIORITY_LABEL: Record<TodoPriority, string> = {
  high: "高",
  medium: "中",
  low: "低",
};

const PRIORITY_CLASS: Record<TodoPriority, string> = {
  high: "bg-destructive/10 text-destructive",
  medium: "bg-amber-500/10 text-amber-600",
  low: "bg-primary/10 text-primary",
};

function TodoListTable({ items, onToggle, className }: TodoListTableProps) {
  const list = items ?? DEFAULT_ITEMS;

  return (
    <div
      data-slot="todo-list-table"
      className={cn("overflow-x-auto rounded-md border", className)}
    >
      <table className="w-full text-sm">
        <caption className="sr-only">待办事项</caption>
        <thead className="bg-muted/50">
          <tr>
            <th scope="col" className="w-10 px-3 py-2 text-center font-medium">完成</th>
            <th scope="col" className="px-3 py-2 text-left font-medium">事项</th>
            <th scope="col" className="px-3 py-2 text-left font-medium">优先级</th>
            <th scope="col" className="px-3 py-2 text-left font-medium">截止日期</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => {
            const completed = item.completed ?? false;
            return (
              <tr key={item.id} className="border-t">
                <td className="px-3 py-2 text-center">
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={completed}
                    aria-label={completed ? `标记「${item.title}」为未完成` : `标记「${item.title}」为已完成`}
                    onClick={() => onToggle?.(item.id)}
                    className={cn(
                      "inline-flex size-5 items-center justify-center rounded border transition-colors",
                      completed
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-input hover:bg-muted",
                    )}
                  >
                    {completed ? (
                      <CheckIcon className="size-3.5" aria-hidden="true" />
                    ) : (
                      <CircleIcon className="size-3 text-transparent" aria-hidden="true" />
                    )}
                  </button>
                </td>
                <td
                  className={cn(
                    "px-3 py-2",
                    completed ? "text-muted-foreground line-through" : "font-medium",
                  )}
                >
                  {item.title}
                </td>
                <td className="px-3 py-2">
                  {item.priority ? (
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-medium",
                        PRIORITY_CLASS[item.priority],
                      )}
                    >
                      <FlagIcon className="size-3" aria-hidden="true" />
                      {PRIORITY_LABEL[item.priority]}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
                <td className="px-3 py-2 text-muted-foreground">
                  {item.deadline ? (
                    <span className="inline-flex items-center gap-1">
                      <ClockIcon className="size-3" aria-hidden="true" />
                      {formatDate(item.deadline)}
                    </span>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export { TodoListTable };
export type { TodoListTableProps };
