import type { Meta, StoryObj } from "@storybook/react"
import { TodoListTable } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof TodoListTable> = {
  title: "Business/TodoListTable",
  component: TodoListTable,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
