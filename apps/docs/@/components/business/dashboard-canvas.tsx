"use client";

import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import { Button } from "@chaos_team/chaos-ui/ui";
import { LayoutGridIcon, Trash2Icon } from "@chaos_team/chaos-ui/ui";

/**
 * @component DashboardCanvas
 * @category business/charts
 * @since 0.7.0
 * @description 仪表盘画布 — 在等比例网格上按 x/y/w/h 摆放 widget 卡片，支持移除与变更回调。
 * @param widgets widget 列表，每项含 id/title/x/y/w/h（基于 12 列网格）
 * @param onChange widget 列表变更回调
 * @example
 * <DashboardCanvas widgets={[{ id: "w1", title: "销售额", x: 0, y: 0, w: 6, h: 2 }]} />
 */

const COLS = 12;
const ROW_HEIGHT = 48;

interface DashboardWidget {
  id: string;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface DashboardCanvasProps {
  widgets: Array<DashboardWidget>;
  onChange?: (widgets: unknown[]) => void;
  className?: string;
}

function DashboardCanvas({
  widgets,
  onChange,
  className,
}: DashboardCanvasProps) {
  const [items, setItems] = React.useState<DashboardWidget[]>(widgets);

  React.useEffect(() => {
    setItems(widgets);
  }, [widgets]);

  const maxRow = items.reduce((m, w) => Math.max(m, w.y + w.h), 0);
  const rows = Math.max(maxRow, 4);
  const height = rows * ROW_HEIGHT;

  const remove = (id: string) => {
    const next = items.filter((w) => w.id !== id);
    setItems(next);
    onChange?.(next);
  };

  const move = (id: string, dx: number, dy: number) => {
    const next = items.map((w) => {
      if (w.id !== id) return w;
      const x = Math.max(0, Math.min(COLS - w.w, w.x + dx));
      const y = Math.max(0, w.y + dy);
      return { ...w, x, y };
    });
    setItems(next);
    onChange?.(next);
  };

  return (
    <div
      data-slot="dashboard-canvas"
      className={cn("bg-muted/30 relative rounded-lg border p-2", className)}
      style={{ minHeight: height + 16 }}
      role="region"
      aria-label="仪表盘画布"
    >
      <div
        className="pointer-events-none absolute inset-2 grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, ${ROW_HEIGHT}px)`,
        }}
        aria-hidden="true"
      >
        {Array.from({ length: COLS * rows }).map((_, i) => (
          <div key={i} className="bg-background/40 rounded-sm" />
        ))}
      </div>
      {items.map((w) => (
        <div
          key={w.id}
          data-widget-id={w.id}
          className="bg-card absolute rounded-lg border p-3 shadow-sm"
          style={{
            left: `calc(${(w.x / COLS) * 100}% + 0.5rem)`,
            top: `${w.y * ROW_HEIGHT + 8}px`,
            width: `calc(${(w.w / COLS) * 100}% - 1rem)`,
            height: `${w.h * ROW_HEIGHT - 4}px`,
          }}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-sm font-medium">{w.title}</span>
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                aria-label={`左移 ${w.title}`}
                onClick={() => move(w.id, -1, 0)}
              >
                <LayoutGridIcon className="size-3 -scale-x-100" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                aria-label={`右移 ${w.title}`}
                onClick={() => move(w.id, 1, 0)}
              >
                <LayoutGridIcon className="size-3" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                aria-label={`移除 ${w.title}`}
                onClick={() => remove(w.id)}
              >
                <Trash2Icon className="size-3" />
              </Button>
            </div>
          </div>
          <p className="text-muted-foreground mt-1 text-xs">
            位置 {w.x},{w.y} · 尺寸 {w.w}×{w.h}
          </p>
        </div>
      ))}
      {items.length === 0 && (
        <p className="text-muted-foreground flex items-center justify-center py-8 text-sm">
          画布为空，请添加 widget
        </p>
      )}
    </div>
  );
}

export { DashboardCanvas };
export type { DashboardCanvasProps };
