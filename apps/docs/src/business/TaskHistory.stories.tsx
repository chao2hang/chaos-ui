import type { Meta, StoryObj } from "@storybook/react"
import { TaskHistory } from "@chaos_team/chaos-ui/business"

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
