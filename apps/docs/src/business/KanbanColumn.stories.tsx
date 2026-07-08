import type { Meta, StoryObj } from "@storybook/react"
import { KanbanColumn } from "@/components/business/kanban-column"

const meta: Meta<typeof KanbanColumn> = {
  title: "Business/KanbanColumn",
  component: KanbanColumn,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
