"use client";

import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import { Button, ScrollArea, Separator } from "@chaos_team/chaos-ui/ui";
import {
  CheckCircle2Icon,
  ArrowRightIcon,
  SearchIcon,
  XIcon,
} from "@chaos_team/chaos-ui/ui-icons";

/**
 * @component RebutNodeSelect
 * @category business/bill
 * @since 0.7.0
 * @description 驳回节点选择器。在审批流中选择将单据驳回到哪一个上游节点。
 * @param nodes 可选驳回节点列表（id / name）
 * @param onSelect 选中节点时回调，携带节点 id
 * @example
 * <RebutNodeSelect nodes={[{ id: "n1", name: "部门审批" }]} onSelect={console.log} />
 */

interface RebutNodeSelectProps {
  nodes: Array<{ id: string; name: string }>;
  onSelect?: (nodeId: string) => void;
  className?: string;
}

function RebutNodeSelect({
  nodes = [],
  onSelect,
  className,
}: RebutNodeSelectProps) {
  const [query, setQuery] = React.useState("");
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const filtered = nodes.filter((n) =>
    n.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const handleConfirm = () => {
    if (selectedId) onSelect?.(selectedId);
  };

  return (
    <div
      data-slot="rebut-node-select"
      className={cn(
        "bg-card flex flex-col gap-3 rounded-lg border p-4",
        className,
      )}
      role="group"
      aria-label="驳回节点选择"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">选择驳回节点</h3>
        <span className="text-muted-foreground text-xs tabular-nums">
          共 {nodes.length} 个节点
        </span>
      </div>

      <div className="relative">
        <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索节点名称"
          aria-label="搜索节点名称"
          className="border-input focus-visible:border-ring focus-visible:ring-ring/50 h-8 w-full rounded-md border bg-transparent pr-8 pl-8 text-sm outline-none focus-visible:ring-3"
        />
        {query && (
          <button
            type="button"
            aria-label="清除搜索"
            onClick={() => setQuery("")}
            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2"
          >
            <XIcon className="size-4" />
          </button>
        )}
      </div>

      <Separator />

      <ScrollArea className="max-h-64">
        {filtered.length > 0 ? (
          <ul role="list" className="flex flex-col gap-1">
            {filtered.map((node) => {
              const isSelected = node.id === selectedId;
              return (
                <li key={node.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(node.id)}
                    aria-pressed={isSelected}
                    className={cn(
                      "focus-visible:ring-ring/50 flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors outline-none focus-visible:ring-3",
                      isSelected
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted",
                    )}
                  >
                    <CheckCircle2Icon
                      className={cn(
                        "size-4 shrink-0",
                        isSelected
                          ? "text-primary"
                          : "text-muted-foreground/40",
                      )}
                    />
                    <span className="flex-1 truncate">{node.name}</span>
                    {isSelected && (
                      <ArrowRightIcon className="text-primary size-4" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-muted-foreground py-6 text-center text-sm">
            无匹配节点
          </p>
        )}
      </ScrollArea>

      <Separator />

      <div className="flex items-center justify-end gap-2">
        <Button
          type="button"
          variant="default"
          onClick={handleConfirm}
          disabled={!selectedId}
        >
          确认驳回
        </Button>
      </div>
    </div>
  );
}

export { RebutNodeSelect };
export type { RebutNodeSelectProps };
