import type { Meta, StoryObj } from "@storybook/react"
import { FlowTracker } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof FlowTracker> = {
  title: "Business/FlowTracker",
  component: FlowTracker,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
