"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { GridIcon } from "@/components/ui/icons";

/**
 * @component QuickEntryGrid
 * @category business/dashboard
 * @since 0.7.0
 * @description 快捷入口网格。将常用功能以图标 + 文字卡片形式平铺，单击触发跳转。
 * @param entries 入口项列表（id / icon / label / onClick）
 * @param columns 固定列数（可选）。不传则使用 auto-fill minmax 自适应（CUI-DASH-03）。
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
  /**
   * Fixed column count. When omitted, uses responsive auto-fill so narrow
   * parents (e.g. dashboard side card) do not force 6 squeezed columns.
   */
  columns?: number;
  /** Minimum track size for auto-fill mode */
  minItemWidth?: string;
  className?: string;
}

function QuickEntryGrid({
  entries = [],
  columns,
  minItemWidth = "5.5rem",
  className,
}: QuickEntryGridProps) {
  const gridStyle: React.CSSProperties | undefined =
    columns != null
      ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }
      : {
          gridTemplateColumns: `repeat(auto-fill, minmax(${minItemWidth}, 1fr))`,
        };

  return (
    <nav
      data-slot="quick-entry-grid"
      className={cn("w-full", className)}
      aria-label="快捷入口"
    >
      <ul role="list" className="grid gap-2" style={gridStyle}>
        {entries.map((entry) => (
          <li key={entry.id} className="min-w-0">
            <button
              type="button"
              onClick={entry.onClick}
              className="group border-border bg-card hover:border-primary hover:bg-muted focus-visible:border-ring focus-visible:ring-ring/50 flex w-full min-w-0 flex-col items-center gap-2 rounded-lg border p-3 text-center transition-colors outline-none focus-visible:ring-3 sm:p-4"
              aria-label={entry.label}
            >
              <span className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex size-10 shrink-0 items-center justify-center rounded-full">
                {entry.icon ?? <GridIcon className="size-5" />}
              </span>
              <span className="text-foreground line-clamp-2 w-full text-center text-xs font-medium break-words sm:text-sm">
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
