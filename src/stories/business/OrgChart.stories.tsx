import type { Meta, StoryObj } from "@storybook/react"
import { OrgChart } from "@/components/business/org-chart"

const meta = {
  title: "Business/OrgChart",
  component: OrgChart,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof OrgChart>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    nodes: [
      { id: "1", name: "张伟", title: "CEO", department: "管理层" },
      { id: "2", name: "李娜", title: "CTO", department: "技术部" },
      { id: "3", name: "王磊", title: "CFO", department: "财务部" },
      { id: "4", name: "陈芳", title: "技术主管", department: "技术部" },
      { id: "5", name: "赵敏", title: "前端负责人", department: "技术部" },
    ],
    edges: [
      { source: "1", target: "2" },
      { source: "1", target: "3" },
      { source: "2", target: "4" },
      { source: "4", target: "5" },
    ],
  },
}

export const Flat: Story = {
  args: {
    nodes: [
      { id: "1", name: "张伟", title: "CEO" },
      { id: "2", name: "李娜", title: "CTO" },
      { id: "3", name: "王磊", title: "CFO" },
    ],
  },
}

export const DeepHierarchy: Story = {
  args: {
    nodes: [
      { id: "1", name: "张伟", title: "CEO", avatarUrl: "" },
      { id: "2", name: "李娜", title: "CTO" },
      { id: "3", name: "陈芳", title: "技术主管" },
      { id: "4", name: "赵敏", title: "前端负责人" },
      { id: "5", name: "孙浩", title: "高级工程师" },
      { id: "6", name: "周琳", title: "工程师" },
    ],
    edges: [
      { source: "1", target: "2" },
      { source: "2", target: "3" },
      { source: "3", target: "4" },
      { source: "4", target: "5" },
      { source: "5", target: "6" },
    ],
  },
}
