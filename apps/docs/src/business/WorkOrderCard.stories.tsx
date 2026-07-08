import type { Meta, StoryObj } from "@storybook/react"
import { WorkOrderCard } from "@/components/business/work-order-card"

const meta: Meta<typeof WorkOrderCard> = {
  title: "Business/WorkOrderCard",
  component: WorkOrderCard,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
