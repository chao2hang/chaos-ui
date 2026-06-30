"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle2Icon,
  CircleIcon,
  ClockIcon,
  XCircleIcon,
  ArrowRightIcon,
} from "@/components/ui/icons";

/**
 * @component WorkflowPreview
 * @category business/lowcode
 * @since 0.7.0
 * @description 工作流预览 — 只读渲染节点状态与连线流向，展示流程执行概览。
 * @keywords workflow, preview, read-only, status
 * @param nodes 节点集合（id/name/status）。
 * @param edges 连线集合（from/to）。
 * @param className 根元素附加类名。
 * @example
 * <WorkflowPreview
 *   nodes={[
 *     { id: "n1", name: "提交申请", status: "done" },
 *     { id: "n2", name: "主管审批", status: "active" },
 *   ]}
 *   edges={[{ from: "n1", to: "n2" }]}
 * />
 */

/** 节点状态到展示元数据的映射。 */
const STATUS_MAP: Record<
  string,
  { label: string; icon: React.ReactNode; tone: string }
> = {
  done: {
    label: "已完成",
    icon: <CheckCircle2Icon className="size-4 text-emerald-500" aria-hidden />,
    tone: "border-emerald-200 bg-emerald-50",
  },
  active: {
    label: "进行中",
    icon: <ClockIcon className="size-4 text-blue-500" aria-hidden />,
    tone: "border-blue-200 bg-blue-50",
  },
  pending: {
    label: "待处理",
    icon: <CircleIcon className="size-4 text-muted-foreground" aria-hidden />,
    tone: "border-border bg-muted/30",
  },
  rejected: {
    label: "已驳回",
    icon: <XCircleIcon className="size-4 text-destructive" aria-hidden />,
    tone: "border-destructive/30 bg-destructive/5",
  },
};

function statusOf(status: string | undefined) {
  return (
    STATUS_MAP[status ?? "pending"] ?? {
      label: status ?? "未知",
      icon: (
        <CircleIcon className="size-4 text-muted-foreground" aria-hidden />
      ),
      tone: "border-border bg-muted/30",
    }
  );
}

interface WorkflowPreviewProps {
  nodes: Array<{ id: string; name: string; status?: string }>;
  edges: Array<{ from: string; to: string }>;
  className?: string;
}

function WorkflowPreview({
  nodes = [],
  edges = [],
  className,
}: WorkflowPreviewProps) {
  // 构建每个节点的下游节点列表，便于在节点卡片上展示流向。
  const outgoing = new Map<string, string[]>();
  for (const edge of edges) {
    const list = outgoing.get(edge.from) ?? [];
    list.push(edge.to);
    outgoing.set(edge.from, list);
  }

  const nameOf = (id: string) =>
    nodes.find((n) => n.id === id)?.name ?? id;

  const stats = nodes.reduce(
    (acc, n) => {
      const key = n.status ?? "pending";
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div
      data-slot="workflow-preview"
      className={cn("flex flex-col gap-4", className)}
    >
      <Card>
        <CardHeader>
          <CardTitle>工作流预览</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* 统计概览 */}
          <div className="flex flex-wrap gap-2 text-sm">
            {Object.entries(stats).map(([key, count]) => {
              const meta = statusOf(key);
              return (
                <Badge key={key} variant="outline" className="gap-1.5">
                  {meta.icon}
                  {meta.label}：{count}
                </Badge>
              );
            })}
          </div>

          {/* 节点流向 */}
          {nodes.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              暂无节点。
            </p>
          ) : (
            <ol role="list" className="flex flex-col gap-2">
              {nodes.map((node, index) => {
                const meta = statusOf(node.status);
                const nexts = outgoing.get(node.id) ?? [];
                return (
                  <li key={node.id} className="flex flex-col gap-2">
                    <div
                      className={cn(
                        "flex items-center gap-2 rounded-md border p-3",
                        meta.tone,
                      )}
                    >
                      <span
                        className="flex size-6 shrink-0 items-center justify-center rounded-full bg-background text-xs font-medium tabular-nums"
                        aria-hidden
                      >
                        {index + 1}
                      </span>
                      {meta.icon}
                      <span className="font-medium">{node.name}</span>
                      <Badge variant="secondary" className="ml-auto">
                        {meta.label}
                      </Badge>
                    </div>
                    {nexts.length > 0 ? (
                      <ul
                        role="list"
                        className="ml-6 flex flex-col gap-1 border-l pl-4"
                      >
                        {nexts.map((toId, i) => (
                          <li
                            key={`${toId}-${i}`}
                            className="flex items-center gap-1.5 text-sm text-muted-foreground"
                          >
                            <ArrowRightIcon
                              className="size-3.5"
                              aria-hidden
                            />
                            <span>{nameOf(toId)}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          )}

          <p className="text-xs text-muted-foreground">
            共 {nodes.length} 个节点，{edges.length} 条连线。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export { WorkflowPreview };
export type { WorkflowPreviewProps };
