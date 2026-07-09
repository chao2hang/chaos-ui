"use client";
import * as React from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type Node,
  type Edge,
  type NodeProps,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { cn } from "@chaos_team/chaos-ui/lib";

export interface WorkflowNodeData extends Record<string, unknown> {
  label: string;
  description?: string;
  type?: "default" | "input" | "output" | "decision";
  color?: string;
}

function WorkflowNode({ data, selected }: NodeProps) {
  const d = data as WorkflowNodeData;
  return (
    <div
      className={cn(
        "bg-card min-w-32 rounded-md border px-3 py-2 text-sm shadow-sm transition-shadow",
        selected && "ring-primary ring-2",
        d.type === "input" && "border-success/50 bg-success/5",
        d.type === "output" && "border-primary/50 bg-primary/5",
        d.type === "decision" && "border-warning/50 bg-warning/5 rotate-45",
      )}
      style={{ borderColor: d.color }}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-primary !size-2"
      />
      <div className={cn("font-medium", d.type === "decision" && "-rotate-45")}>
        {d.label}
      </div>
      {d.description && (
        <div
          className={cn(
            "text-muted-foreground mt-0.5 text-xs",
            d.type === "decision" && "-rotate-45",
          )}
        >
          {d.description}
        </div>
      )}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-primary !size-2"
      />
    </div>
  );
}

const nodeTypes = { workflow: WorkflowNode };

interface WorkflowViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  nodes: Node<WorkflowNodeData>[];
  edges: Edge[];
  onNodeClick?: (node: Node) => void;
  showControls?: boolean;
  showMinimap?: boolean;
  className?: string;
  height?: number;
}

export function WorkflowViewer({
  nodes,
  edges,
  onNodeClick,
  showControls = true,
  showMinimap = false,
  className,
  height = 480,
  ...props
}: WorkflowViewerProps) {
  return (
    <div
      data-slot="workflow-viewer"
      className={cn("rounded-md border bg-zinc-50 dark:bg-zinc-950", className)}
      style={{ height }}
      {...props}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={(_, n) => onNodeClick?.(n)}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={16} size={1} />
        {showControls && <Controls />}
        {showMinimap && <MiniMap />}
      </ReactFlow>
    </div>
  );
}

interface OrgChartNodeData extends Record<string, unknown> {
  name: string;
  role?: string;
  avatar?: string;
}

function OrgChartNode({ data }: NodeProps) {
  const d = data as OrgChartNodeData;
  return (
    <div className="bg-card min-w-40 rounded-md border p-3 text-center shadow-sm">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-primary !size-2"
      />
      <div className="bg-muted mx-auto mb-1 size-10 rounded-full" />
      <div className="text-sm font-medium">{d.name}</div>
      {d.role && <div className="text-muted-foreground text-xs">{d.role}</div>}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-primary !size-2"
      />
    </div>
  );
}

const orgNodeTypes = { org: OrgChartNode };

interface OrgChartProps extends React.HTMLAttributes<HTMLDivElement> {
  nodes: Node<OrgChartNodeData>[];
  edges: Edge[];
  className?: string;
  height?: number;
}

export function OrgChart({
  nodes,
  edges,
  className,
  height = 480,
  ...props
}: OrgChartProps) {
  return (
    <div
      data-slot="org-chart"
      className={cn("rounded-md border bg-zinc-50 dark:bg-zinc-950", className)}
      style={{ height }}
      {...props}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={orgNodeTypes}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={16} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
