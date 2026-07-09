import type { Meta, StoryObj } from "@storybook/react"
import { PromotionRuleCard } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof PromotionRuleCard> = {
  title: "Business/PromotionRuleCard",
  component: PromotionRuleCard,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
