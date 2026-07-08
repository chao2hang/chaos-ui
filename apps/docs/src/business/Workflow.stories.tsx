import type { Meta, StoryObj } from "@storybook/react"
import { WorkflowViewer, type WorkflowNodeData } from "@/components/business/workflow"
import type { Node, Edge } from "@xyflow/react"

const nodes: Node<WorkflowNodeData>[] = [
  { id: "1", type: "workflow", position: { x: 250, y: 0 }, data: { label: "开始", type: "input" } },
  { id: "2", type: "workflow", position: { x: 250, y: 100 }, data: { label: "处理数据", description: "解析上传文件" } },
  { id: "3", type: "workflow", position: { x: 100, y: 220 }, data: { label: "校验通过?", type: "decision" } },
  { id: "4", type: "workflow", position: { x: 400, y: 220 }, data: { label: "错误处理", color: "#ef4444" } },
  { id: "5", type: "workflow", position: { x: 250, y: 350 }, data: { label: "完成", type: "output" } },
]

const edges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e3-5", source: "3", target: "5", label: "是" },
  { id: "e3-4", source: "3", target: "4", label: "否" },
  { id: "e4-2", source: "4", target: "2" },
]

const meta: Meta<typeof WorkflowViewer> = {
  title: "Business/Workflow",
  component: WorkflowViewer,
  tags: ["autodocs"],
  parameters: { layout: "padded" };

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    nodes,
    edges,
    showControls: true,
  },
}

export const WithMinimap: Story = {
  args: {
    nodes,
    edges,
    showControls: true,
    showMinimap: true,
  },
}

export const Dark: Story = {
  args: {
    nodes,
    edges,
  },
  parameters: { backgrounds: { default: "dark" } },
}
