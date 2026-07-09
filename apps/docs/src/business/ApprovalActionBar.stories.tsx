import type { Meta, StoryObj } from "@storybook/react"
import { ApprovalActionBar } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof ApprovalActionBar> = {
  title: "Business/ApprovalActionBar",
  component: ApprovalActionBar,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
