import type { Meta, StoryObj } from "@storybook/react"
import { TaskProgress } from "@/components/business/task-progress"

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
