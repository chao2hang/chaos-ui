import type { Meta, StoryObj } from "@storybook/react"
import { TreeView, type TreeNode } from "@/components/ui/tree-view"

const sampleData: TreeNode[] = [
  {
    id: "1",
    label: "Documents",
    children: [
      { id: "1-1", label: "Work" },
      { id: "1-2", label: "Personal" },
    ],
  },
  {
    id: "2",
    label: "Images",
    children: [
      { id: "2-1", label: "Photo1.jpg" },
      { id: "2-2", label: "Photo2.png" },
    ],
  },
  {
    id: "3",
    label: "Videos",
    children: [
      { id: "3-1", label: "Video1.mp4" },
    ],
  },
]

const meta = {
  title: "Components/TreeView",
  component: TreeView,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof TreeView>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { data: sampleData, defaultExpandedIds: ["1"] },
}

export const WithCheckboxes: Story = {
  args: { data: sampleData, showCheckbox: true, defaultExpandedIds: ["1"] },
}

export const WithoutIcons: Story = {
  args: { data: sampleData, showIcon: false, defaultExpandedIds: ["1", "2"] },
}

