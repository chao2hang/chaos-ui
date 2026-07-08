import type { Meta, StoryObj } from "@storybook/react"
import { AsyncTaskTrigger } from "@/components/business/async-task-trigger"

const meta: Meta<typeof AsyncTaskTrigger> = {
  title: "Business/AsyncTaskTrigger",
  component: AsyncTaskTrigger,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
