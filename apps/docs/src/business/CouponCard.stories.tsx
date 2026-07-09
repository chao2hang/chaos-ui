import type { Meta, StoryObj } from "@storybook/react"
import { CouponCard } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof CouponCard> = {
  title: "Business/CouponCard",
  component: CouponCard,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
