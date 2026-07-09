import type { Meta, StoryObj } from "@storybook/react"
import { AccountBalance } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof AccountBalance> = {
  title: "Business/AccountBalance",
  component: AccountBalance,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
