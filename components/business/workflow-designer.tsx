"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PlusIcon,
  Trash2Icon,
  SettingsIcon,
} from "@/components/ui/icons";

/**
 * @component WorkflowDesigner
 * @category business/lowcode
 * @since 0.7.0
 * @description 工作流设计器 — 可视化编辑节点与连线，渲染节点画布与连线关系，对外抛出 onChange。
 * @keywords workflow, designer, lowcode, node, edge
 * @param nodes 节点集合（id/type/name）。
 * @param edges 连线集合（from/to）。
 * @param onChange 配置变化时回调。
 * @param className 根元素附加类名。
 * @example
 * <WorkflowDesigner
 *   nodes={[{ id: "n1", type: "start", name: "开始" }]}
 *   edges={[{ from: "n1", to: "n2" }]}
 * />
 */

/** 节点类型选项。 */
const NODE_TYPES = [
  { value: "start", label: "开始" },
  { value: "approval", label: "审批" },
  { value: "condition", label: "条件" },
  { value: "task", label: "任务" },
  { value: "end", label: "结束" },
] as const;

interface WorkflowNode {
  id: string;
  type: string;
  name: string;
}

interface WorkflowEdge {
  from: string;
  to: string;
}

interface WorkflowDesignerProps {
  nodes: Array<WorkflowNode>;
  edges: Array<WorkflowEdge>;
  onChange?: (config: unknown) => void;
  className?: string;
}

function WorkflowDesigner({
  nodes = [],
  edges = [],
  onChange,
  className,
}: WorkflowDesignerProps) {
  const [items, setItems] = React.useState<WorkflowNode[]>(nodes);
  const [edgesState, setEdgesState] = React.useState<WorkflowEdge[]>(edges);
  const [draftFrom, setDraftFrom] = React.useState("");
  const [draftTo, setDraftTo] = React.useState("");

  // Keep internal state in sync when controlled props change.
  React.useEffect(() => {
    setItems(nodes);
  }, [nodes]);
  React.useEffect(() => {
    setEdgesState(edges);
  }, [edges]);

  const emit = React.useCallback(
    (nextNodes: WorkflowNode[], nextEdges: WorkflowEdge[]) => {
      setItems(nextNodes);
      setEdgesState(nextEdges);
      onChange?.({ nodes: nextNodes, edges: nextEdges });
    },
    [onChange],
  );

  const addNode = () => {
    const next: WorkflowNode = {
      id: `node-${Date.now()}`,
      type: "task",
      name: `节点 ${items.length + 1}`,
    };
    emit([...items, next], edgesState);
  };

  const updateNode = (id: string, patch: Partial<WorkflowNode>) => {
    emit(
      items.map((n) => (n.id === id ? { ...n, ...patch } : n)),
      edgesState,
    );
  };

  const removeNode = (id: string) => {
    emit(
      items.filter((n) => n.id !== id),
      edgesState.filter((e) => e.from !== id && e.to !== id),
    );
  };

  const addEdge = () => {
    if (!draftFrom || !draftTo || draftFrom === draftTo) return;
    emit(items, [...edgesState, { from: draftFrom, to: draftTo }]);
    setDraftFrom("");
    setDraftTo("");
  };

  const removeEdge = (idx: number) => {
    emit(items, edgesState.filter((_, i) => i !== idx));
  };

  const idToName = (id: string) =>
    items.find((n) => n.id === id)?.name ?? id;

  return (
    <div
      data-slot="workflow-designer"
      className={cn("flex flex-col gap-4", className)}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="size-4" aria-hidden />
            工作流设计器
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* 节点画布 */}
          {items.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              暂无节点，请新增节点。
            </p>
          ) : (
            <ul
              role="list"
              className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3"
            >
              {items.map((node) => {
                const typeLabel =
                  NODE_TYPES.find((t) => t.value === node.type)?.label ??
                  node.type;
                return (
                  <li
                    key={node.id}
                    className="flex flex-col gap-2 rounded-md border p-2"
                  >
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{typeLabel}</Badge>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => removeNode(node.id)}
                        aria-label={`删除节点 ${node.name}`}
                      >
                        <Trash2Icon />
                      </Button>
                    </div>
                    <Input
                      type="text"
                      value={node.name}
                      aria-label={`节点 ${node.id} 名称`}
                      onChange={(event) =>
                        updateNode(node.id, { name: event.target.value })
                      }
                    />
                    <Select
                      value={node.type}
                      onValueChange={(value) => {
                        if (typeof value === "string") {
                          updateNode(node.id, { type: value });
                        }
                      }}
                    >
                      <SelectTrigger aria-label={`节点 ${node.id} 类型`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {NODE_TYPES.map((t) => (
                          <SelectItem key={t.value} value={t.value}>
                            {t.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </li>
                );
              })}
            </ul>
          )}

          <div>
            <Button type="button" onClick={addNode}>
              <PlusIcon />
              新增节点
            </Button>
          </div>

          {/* 连线编辑 */}
          <div className="rounded-md border p-2">
            <p className="mb-2 text-sm font-medium">连线</p>
            <div className="flex flex-wrap items-center gap-2">
              <Select
                value={draftFrom}
                onValueChange={(value) => {
                  if (typeof value === "string") setDraftFrom(value);
                }}
              >
                <SelectTrigger aria-label="起点节点" className="w-[10rem]">
                  <SelectValue placeholder="起点" />
                </SelectTrigger>
                <SelectContent>
                  {items.map((n) => (
                    <SelectItem key={n.id} value={n.id}>
                      {n.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-muted-foreground">→</span>
              <Select
                value={draftTo}
                onValueChange={(value) => {
                  if (typeof value === "string") setDraftTo(value);
                }}
              >
                <SelectTrigger aria-label="终点节点" className="w-[10rem]">
                  <SelectValue placeholder="终点" />
                </SelectTrigger>
                <SelectContent>
                  {items.map((n) => (
                    <SelectItem key={n.id} value={n.id}>
                      {n.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                onClick={addEdge}
                disabled={!draftFrom || !draftTo}
                aria-label="新增连线"
              >
                <PlusIcon />
                连线
              </Button>
            </div>

            {edgesState.length === 0 ? (
              <p className="mt-2 text-xs text-muted-foreground">暂无连线。</p>
            ) : (
              <ul role="list" className="mt-2 flex flex-col gap-1">
                {edgesState.map((edge, idx) => (
                  <li
                    key={`${edge.from}-${edge.to}-${idx}`}
                    className="flex items-center gap-2 text-sm"
                  >
                    <span className="text-foreground">
                      {idToName(edge.from)}
                    </span>
                    <span className="text-muted-foreground">→</span>
                    <span className="text-foreground">
                      {idToName(edge.to)}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => removeEdge(idx)}
                      aria-label={`删除连线 ${idx + 1}`}
                      className="ml-auto"
                    >
                      <Trash2Icon />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <p className="text-xs text-muted-foreground">
            共 {items.length} 个节点，{edgesState.length} 条连线。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export { WorkflowDesigner };
export type { WorkflowDesignerProps, WorkflowNode, WorkflowEdge };
