import type { Meta, StoryObj } from "@storybook/react"
import { TaskListTable } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof TaskListTable> = {
  title: "Business/TaskListTable",
  component: TaskListTable,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
