"use client";

import { cn } from "@/lib/utils";

/**
 * @component RebutNodeSelect
 * @category business/bill
 * @since 0.7.0
 * @description 驳回节点选择器
 * @keywords rebut, node, select
 * @example
 * <RebutNodeSelect />
 */

interface RebutNodeSelectProps {
  nodes: Array<{ id: string; name: string }>;
  onSelect?: (nodeId: string) => void;
  className?: string;
}

function RebutNodeSelect({ className }: RebutNodeSelectProps) {
  return (
    <div data-slot="rebut-node-select" className={cn("", className)}>
      {null}
    </div>
  );
}

export { RebutNodeSelect };
export type { RebutNodeSelectProps };
