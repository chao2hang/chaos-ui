import type { Meta, StoryObj } from "@storybook/react"
import { PromotionRuleEditor } from "@/components/business/promotion-rule-editor"

const meta: Meta<typeof PromotionRuleEditor> = {
  title: "Business/PromotionRuleEditor",
  component: PromotionRuleEditor,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
