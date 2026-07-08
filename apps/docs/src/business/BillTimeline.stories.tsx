import type { Meta, StoryObj } from "@storybook/react"
import { BillTimeline } from "@/components/business/bill-timeline"

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
