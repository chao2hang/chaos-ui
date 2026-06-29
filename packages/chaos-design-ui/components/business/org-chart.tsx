"use client"
import * as React from "react"
import {
  ReactFlow,
  Background,
  Controls,
  Handle,
  Position,
  type Node,
  type Edge,
  type NodeProps,
  useNodesState,
  useEdgesState,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { cn } from "@/lib/utils"

interface OrgNode {
  id: string
  name: string
  title: string
  avatarUrl?: string
  department?: string
}

interface OrgEdge {
  source: string
  target: string
}

interface OrgChartNodeData extends Record<string, unknown> {
  orgNode: OrgNode
}

function OrgChartNodeComponent({ data }: NodeProps) {
  const d = data as OrgChartNodeData
  const { name, title, avatarUrl, department } = d.orgNode
  return (
    <div className="min-w-40 rounded-lg border bg-card p-3 text-center shadow-sm transition-shadow hover:shadow-md">
      <Handle type="target" position={Position.Top} className="!size-2 !bg-primary" />
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name}
          className="mx-auto mb-1.5 size-10 rounded-full object-cover"
        />
      ) : (
        <div className="mx-auto mb-1.5 flex size-10 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
          {name.charAt(0)}
        </div>
      )}
      <div className="text-sm font-medium">{name}</div>
      <div className="text-xs text-muted-foreground">{title}</div>
      {department && (
        <div className="mt-1 text-xs text-muted-foreground/70">{department}</div>
      )}
      <Handle type="source" position={Position.Bottom} className="!size-2 !bg-primary" />
    </div>
  )
}

const nodeTypes = { org: OrgChartNodeComponent }

function buildFlowElements(orgNodes: OrgNode[], orgEdges?: OrgEdge[]) {
  const nodes: Node[] = orgNodes.map((n, i) => ({
    id: n.id,
    type: "org",
    position: { x: 0, y: i * 120 },
    data: { orgNode: n },
  }))

  const edges: Edge[] = (orgEdges ?? []).map((e) => ({
    id: `${e.source}-${e.target}`,
    source: e.source,
    target: e.target,
    type: "smoothstep",
  }))

  return { nodes, edges }
}

interface OrgChartProps extends React.ComponentProps<"div"> {
  nodes: OrgNode[]
  edges?: OrgEdge[]
  onNodeClick?: (node: OrgNode) => void
  className?: string
}

function OrgChart({ nodes, edges: orgEdges, onNodeClick, className, ...props }: OrgChartProps) {
  const { nodes: flowNodes, edges: flowEdges } = React.useMemo(
    () => buildFlowElements(nodes, orgEdges),
    [nodes, orgEdges],
  )

  const [rn, setNodes, onNodesChange] = useNodesState(flowNodes)
  const [re, setEdges, onEdgesChange] = useEdgesState(flowEdges)

  React.useEffect(() => {
    const { nodes: n, edges: e } = buildFlowElements(nodes, orgEdges)
    setNodes(n)
    setEdges(e)
  }, [nodes, orgEdges, setNodes, setEdges])

  const handleClick = React.useCallback(
    (_: React.MouseEvent, node: Node) => {
      const orgNode = (node.data as OrgChartNodeData).orgNode
      onNodeClick?.(orgNode)
    },
    [onNodeClick],
  )

  return (
    <div
      data-slot="org-chart"
      className={cn("rounded-md border bg-zinc-50 dark:bg-zinc-950", className)}
      style={{ height: 500 }}
      {...props}
    >
      <ReactFlow
        nodes={rn}
        edges={re}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleClick}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={16} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  )
}

OrgChart.displayName = "OrgChart"

export { OrgChart }
export type { OrgNode, OrgEdge, OrgChartProps }
