import * as React from "react";

import { Badge } from "@/components/ui";
import { cn } from "@/lib/utils";

export type DiffChangeType = "added" | "removed" | "changed" | "unchanged";

export interface DiffViewerItem {
  field: string;
  label?: string;
  before?: React.ReactNode;
  after?: React.ReactNode;
  type?: DiffChangeType;
}

export interface DiffViewerProps extends React.ComponentProps<"div"> {
  items: DiffViewerItem[];
  beforeLabel?: string;
  afterLabel?: string;
}

const badgeVariant: Record<
  DiffChangeType,
  "default" | "secondary" | "destructive" | "outline"
> = {
  added: "default",
  removed: "destructive",
  changed: "secondary",
  unchanged: "outline",
};

/**
 * @component DiffViewer
 * @category business/data
 * @since 0.2.0
 * @description Side-by-side diff viewer for comparing field-level changes with type badges (added/removed/changed) / 并排差异对比视图，展示字段级变更并标记变更类型
 * @keywords diff, compare, changes, data, audit
 * @example
 * <DiffViewer items={[{ field: "name", before: "Old", after: "New" }]} />
 */
export function DiffViewer({
  items,
  beforeLabel = "Before",
  afterLabel = "After",
  className,
  ...props
}: DiffViewerProps) {
  return (
    <div
      data-slot="diff-viewer"
      className={cn("overflow-hidden rounded-lg border", className)}
      {...props}
    >
      <div className="grid grid-cols-[minmax(140px,0.7fr)_1fr_1fr_auto] border-b bg-muted/40 px-4 py-2 text-xs font-medium text-muted-foreground">
        <span>Field</span>
        <span>{beforeLabel}</span>
        <span>{afterLabel}</span>
        <span>Change</span>
      </div>
      <div className="divide-y">
        {items.map((item) => {
          const type = item.type ?? "changed";
          return (
            <div
              key={item.field}
              className="grid grid-cols-[minmax(140px,0.7fr)_1fr_1fr_auto] gap-3 px-4 py-3 text-sm"
            >
              <span className="font-medium">{item.label ?? item.field}</span>
              <span
                className={cn(
                  type === "removed" && "text-destructive line-through",
                )}
              >
                {item.before ?? "-"}
              </span>
              <span
                className={cn(
                  type === "added" && "text-success",
                  type === "changed" && "font-medium",
                )}
              >
                {item.after ?? "-"}
              </span>
              <Badge variant={badgeVariant[type]}>{type}</Badge>
            </div>
          );
        })}
      </div>
    </div>
  );
}
