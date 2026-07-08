import type { Meta, StoryObj } from "@storybook/react"
import { TargetProgress } from "@/components/business/target-progress"

const meta: Meta<typeof TargetProgress> = {
  title: "Business/TargetProgress",
  component: TargetProgress,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
