import type { Meta, StoryObj } from "@storybook/react"
import { TaskHistory } from "@/components/business/task-history"

const meta: Meta<typeof TaskHistory> = {
  title: "Business/TaskHistory",
  component: TaskHistory,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
