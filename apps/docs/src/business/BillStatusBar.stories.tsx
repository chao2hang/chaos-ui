import type { Meta, StoryObj } from "@storybook/react"
import { BillStatusBar } from "@/components/business/bill-status-bar"

const meta: Meta<typeof BillStatusBar> = {
  title: "Business/BillStatusBar",
  component: BillStatusBar,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
