"use client";
import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import { Badge } from "@chaos_team/chaos-ui/ui";
import { PlusIcon } from "@chaos_team/chaos-ui/ui";

/**
 * @component KanbanColumn
 * @category Business
 * @since 1.0.0-beta.0
 * @description 看板列(单列) — 渲染看板的单个状态列，含列标题、卡片列表与新增卡片入口。
 * @param title 列标题（如"待处理"）
 * @param accent 列顶部强调色，默认 primary
 * @param cards 卡片数组，每项含 id/title/label(可选)/assignee(可选)
 * @param onAddCard 点击"新增"回调
 * @param onCardClick 点击卡片回调
 * @example
 * ```tsx
 * <KanbanColumn
 *   title="待处理"
 *   cards={[{ id: "c1", title: "对接支付通道" }]}
 *   onAddCard={() => {}}
 * />
 * ```
 */
interface KanbanColumnProps {
  /** 列标题 */
  title?: string;
  /** 列强调色 */
  accent?: string;
  /** 卡片列表 */
  cards?: Array<{
    id: string;
    title: string;
    label?: string;
    assignee?: string;
  }>;
  /** 新增卡片回调 */
  onAddCard?: () => void;
  /** 卡片点击回调 */
  onCardClick?: (id: string) => void;
  className?: string;
}

const ACCENT_CLASS: Record<string, string> = {
  primary: "bg-primary",
  emerald: "bg-emerald-500",
  yellow: "bg-yellow-500",
  red: "bg-red-500",
  blue: "bg-blue-500",
};

function KanbanColumn({
  title = "未命名列",
  accent = "primary",
  cards = [],
  onAddCard,
  onCardClick,
  className,
}: KanbanColumnProps) {
  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onCardClick?.(id);
    }
  };

  return (
    <div
      data-slot="kanban-column"
      className={cn(
        "bg-muted/30 flex w-72 shrink-0 flex-col gap-2 rounded-lg border p-2",
        className,
      )}
      role="group"
      aria-label={`看板列 ${title}`}
    >
      <div className="flex items-center gap-2 px-1">
        <span
          className={cn(
            "size-2 rounded-full",
            ACCENT_CLASS[accent] ?? ACCENT_CLASS.primary,
          )}
          aria-hidden="true"
        />
        <span className="text-sm font-medium">{title}</span>
        <Badge variant="secondary" className="ml-auto">
          {cards.length}
        </Badge>
      </div>
      <ul className="flex flex-col gap-2" role="list">
        {cards.map((c) => (
          <li key={c.id}>
            <div
              role="button"
              tabIndex={0}
              onClick={() => onCardClick?.(c.id)}
              onKeyDown={(e) => handleKeyDown(e, c.id)}
              className="bg-card hover:bg-accent focus-visible:ring-ring flex cursor-pointer flex-col gap-1.5 rounded-lg border p-3 shadow-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
              aria-label={`卡片 ${c.title}`}
            >
              <span className="text-sm font-medium">{c.title}</span>
              <div className="flex items-center gap-2">
                {c.label && <Badge variant="outline">{c.label}</Badge>}
                {c.assignee && (
                  <span className="text-muted-foreground ml-auto text-xs">
                    {c.assignee}
                  </span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
      {cards.length === 0 && (
        <p className="text-muted-foreground py-3 text-center text-xs">
          暂无卡片
        </p>
      )}
      <button
        type="button"
        onClick={onAddCard}
        className="text-muted-foreground hover:bg-muted hover:text-foreground flex items-center justify-center gap-1 rounded-md border border-dashed py-1.5 text-xs transition-colors"
      >
        <PlusIcon className="size-3" />
        新增卡片
      </button>
    </div>
  );
}

export { KanbanColumn };
export type { KanbanColumnProps };
