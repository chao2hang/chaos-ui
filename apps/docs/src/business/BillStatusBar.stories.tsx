import type { Meta, StoryObj } from "@storybook/react"
import { BillStatusBar } from "@chaos_team/chaos-ui/business"

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
