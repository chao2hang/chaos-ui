import type { Meta, StoryObj } from "@storybook/react"
import { BillTimeline } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof BillTimeline> = {
  title: "Business/BillTimeline",
  component: BillTimeline,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
