"use client";

import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import { GridIcon } from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component QuickEntryGrid
 * @category business/dashboard
 * @since 0.7.0
 * @description 快捷入口网格。将常用功能以图标 + 文字卡片形式平铺，单击触发跳转。
 * @param entries 入口项列表（id / icon / label / onClick）
 * @example
 * <QuickEntryGrid entries={[{ id: "bill", label: "新建账单", onClick: () => {} }]} />
 */

interface QuickEntryGridProps {
  entries: Array<{
    id: string;
    icon?: React.ReactNode;
    label: string;
    onClick: () => void;
  }>;
  className?: string;
}

function QuickEntryGrid({ entries = [], className }: QuickEntryGridProps) {
  return (
    <nav
      data-slot="quick-entry-grid"
      className={cn("w-full", className)}
      aria-label="快捷入口"
    >
      <ul
        role="list"
        className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
      >
        {entries.map((entry) => (
          <li key={entry.id}>
            <button
              type="button"
              onClick={entry.onClick}
              className="group border-border bg-card hover:border-primary hover:bg-muted focus-visible:border-ring focus-visible:ring-ring/50 flex w-full flex-col items-center gap-2 rounded-lg border p-4 text-center transition-colors outline-none focus-visible:ring-3"
              aria-label={entry.label}
            >
              <span className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex size-10 items-center justify-center rounded-full">
                {entry.icon ?? <GridIcon className="size-5" />}
              </span>
              <span className="text-foreground text-sm font-medium">
                {entry.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export { QuickEntryGrid };
export type { QuickEntryGridProps };
