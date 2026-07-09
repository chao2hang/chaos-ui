"use client";
import * as React from "react";
import { cn } from "@chaos_team/chaos-ui/lib";
import {
  CheckIcon,
  ClockIcon,
  XIcon,
  ChevronRightIcon,
} from "@chaos_team/chaos-ui/ui";
/**
 * @component ApprovalFlow
 * @category business/bill
 * @since 0.7.0
 * @description 审批流程图
 */
interface ApprovalFlowProps {
  nodes: Array<{ id: string; name: string; type: string; status?: string }>;
  edges: Array<{ from: string; to: string }>;
  className?: string;
}
const STATUS_STYLE: Record<string, string> = {
  approved: "bg-emerald-100 text-emerald-700",
  pending: "bg-yellow-100 text-yellow-700",
  rejected: "bg-red-100 text-red-700",
  processing: "bg-blue-100 text-blue-700",
};
function ApprovalFlow({
  nodes = [],
  edges = [],
  className,
}: ApprovalFlowProps) {
  const order = React.useMemo(() => {
    const next = new Map<string, string>();
    edges.forEach((e) => next.set(e.from, e.to));
    const starts = nodes.filter((n) => !edges.some((e) => e.to === n.id));
    const out: typeof nodes = [];
    let cur: string | undefined = starts[0]?.id;
    const seen = new Set<string>();
    while (cur && !seen.has(cur)) {
      seen.add(cur);
      const n = nodes.find((x) => x.id === cur);
      if (n) out.push(n);
      cur = next.get(cur);
    }
    if (out.length === 0) return nodes;
    return out;
  }, [nodes, edges]);
  return (
    <div
      data-slot="approval-flow"
      className={cn("flex flex-wrap items-center gap-2", className)}
    >
      {order.map((n, i) => (
        <React.Fragment key={n.id}>
          <div className="bg-card flex items-center gap-2 rounded-lg border px-3 py-2 text-sm">
            <span
              className={cn(
                "flex size-5 items-center justify-center rounded-full text-xs",
                STATUS_STYLE[n.status ?? "pending"] ?? "bg-muted",
              )}
            >
              {n.status === "approved" ? (
                <CheckIcon className="size-3" />
              ) : n.status === "rejected" ? (
                <XIcon className="size-3" />
              ) : (
                <ClockIcon className="size-3" />
              )}
            </span>
            <span className="font-medium">{n.name}</span>
          </div>
          {i < order.length - 1 && (
            <ChevronRightIcon className="text-muted-foreground size-4" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
export { ApprovalFlow };
export type { ApprovalFlowProps };
