"use client"
import * as React from "react"
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
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { cn } from "@/lib/utils"

export interface WorkflowNodeData extends Record<string, unknown> {
  label: string
  description?: string
  type?: "default" | "input" | "output" | "decision"
  color?: string
}

function WorkflowNode({ data, selected }: NodeProps) {
  const d = data as WorkflowNodeData
  return (
    <div
      className={cn(
        "min-w-32 rounded-md border bg-card px-3 py-2 text-sm shadow-sm transition-shadow",
        selected && "ring-2 ring-primary",
        d.type === "input" && "border-success/50 bg-success/5",
        d.type === "output" && "border-primary/50 bg-primary/5",
        d.type === "decision" && "rotate-45 border-warning/50 bg-warning/5"
      )}
      style={{ borderColor: d.color }}
    >
      <Handle type="target" position={Position.Top} className="!size-2 !bg-primary" />
      <div className={cn("font-medium", d.type === "decision" && "rotate--45")}>{d.label}</div>
      {d.description && (
        <div className={cn("mt-0.5 text-xs text-muted-foreground", d.type === "decision" && "rotate--45")}>
          {d.description}
        </div>
      )}
      <Handle type="source" position={Position.Bottom} className="!size-2 !bg-primary" />
    </div>
  )
}

const nodeTypes = { workflow: WorkflowNode }

interface WorkflowViewerProps extends React.ComponentProps<"div"> {
  nodes: Node<WorkflowNodeData>[]
  edges: Edge[]
  onNodeClick?: (node: Node) => void
  showControls?: boolean
  showMinimap?: boolean
  className?: string
  height?: number
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
  )
}

interface OrgChartNodeData extends Record<string, unknown> {
  name: string
  role?: string
  avatar?: string
}

function OrgChartNode({ data }: NodeProps) {
  const d = data as OrgChartNodeData
  return (
    <div className="min-w-40 rounded-md border bg-card p-3 text-center shadow-sm">
      <Handle type="target" position={Position.Top} className="!size-2 !bg-primary" />
      <div className="mx-auto mb-1 size-10 rounded-full bg-muted" />
      <div className="text-sm font-medium">{d.name}</div>
      {d.role && <div className="text-xs text-muted-foreground">{d.role}</div>}
      <Handle type="source" position={Position.Bottom} className="!size-2 !bg-primary" />
    </div>
  )
}

const orgNodeTypes = { org: OrgChartNode }

interface OrgChartProps extends React.ComponentProps<"div"> {
  nodes: Node<OrgChartNodeData>[]
  edges: Edge[]
  className?: string
  height?: number
}

export function OrgChart({ nodes, edges, className, height = 480, ...props }: OrgChartProps) {
  return (
    <div
      data-slot="org-chart"
      className={cn("rounded-md border bg-zinc-50 dark:bg-zinc-950", className)}
      style={{ height }}
      {...props}
    >
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={orgNodeTypes} fitView proOptions={{ hideAttribution: true }}>
        <Background gap={16} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  )
}
