import type { Meta, StoryObj } from "@storybook/react"
import { TaskProgress } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof TaskProgress> = {
  title: "Business/TaskProgress",
  component: TaskProgress,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
