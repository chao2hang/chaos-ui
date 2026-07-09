"use client";

import { cn } from "@chaos_team/chaos-ui/lib";
import { formatNumber } from "@chaos_team/chaos-ui/lib";
import { PackageCheckIcon, PackageIcon } from "@chaos_team/chaos-ui/ui";

/**
 * @component InventorySnapshot
 * @category business/finance
 * @since 0.7.0
 * @description 库存快照 — 展示各商品当前库存量与状态(正常/偏低/缺货)的快照列表。
 * @param items 商品库存项数组
 * @example
 * <InventorySnapshot
 *   items={[
 *     { id: "s1", name: "原料A", qty: 120, status: "normal" },
 *     { id: "s2", name: "原料B", qty: 5, status: "low" },
 *   ]}
 * />
 */

interface InventorySnapshotProps {
  items: Array<{
    id: string;
    name: string;
    qty: number;
    status: "normal" | "low" | "out";
  }>;
  className?: string;
}

const STATUS_META: Record<
  InventorySnapshotProps["items"][number]["status"],
  { label: string; tone: string; dot: string }
> = {
  normal: { label: "正常", tone: "text-emerald-600", dot: "bg-emerald-500" },
  low: { label: "偏低", tone: "text-yellow-600", dot: "bg-yellow-500" },
  out: { label: "缺货", tone: "text-destructive", dot: "bg-red-500" },
};

function InventorySnapshot({ items, className }: InventorySnapshotProps) {
  const normalCount = items.filter((i) => i.status === "normal").length;
  const lowCount = items.filter((i) => i.status === "low").length;
  const outCount = items.filter((i) => i.status === "out").length;

  return (
    <div
      data-slot="inventory-snapshot"
      className={cn("flex flex-col gap-3 rounded-lg border bg-card p-4", className)}
      role="region"
      aria-label="库存快照"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">库存快照</span>
        <span className="text-xs text-muted-foreground">共 {items.length} 项</span>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded-md bg-emerald-50 py-1.5">
          <div className="text-muted-foreground">正常</div>
          <div className="font-semibold text-emerald-600">{normalCount}</div>
        </div>
        <div className="rounded-md bg-yellow-50 py-1.5">
          <div className="text-muted-foreground">偏低</div>
          <div className="font-semibold text-yellow-600">{lowCount}</div>
        </div>
        <div className="rounded-md bg-red-50 py-1.5">
          <div className="text-muted-foreground">缺货</div>
          <div className="font-semibold text-destructive">{outCount}</div>
        </div>
      </div>
      <ul className="flex flex-col divide-y" role="list">
        {items.map((it) => {
          const meta = STATUS_META[it.status];
          const Icon = it.status === "out" ? PackageIcon : PackageCheckIcon;
          return (
            <li key={it.id} className="flex items-center gap-3 py-2 text-sm">
              <Icon className={cn("size-4 shrink-0", meta.tone)} />
              <span className="flex-1 truncate">{it.name}</span>
              <span className={cn("flex items-center gap-1 text-xs", meta.tone)}>
                <span className={cn("size-1.5 rounded-full", meta.dot)} />
                {meta.label}
              </span>
              <span className="w-16 text-right tabular-nums text-muted-foreground">
                {it.status === "out" ? "-" : formatNumber(it.qty)}
              </span>
            </li>
          );
        })}
      </ul>
      {items.length === 0 && (
        <p className="py-4 text-center text-sm text-muted-foreground">暂无库存数据</p>
      )}
    </div>
  );
}

export { InventorySnapshot };
export type { InventorySnapshotProps };
