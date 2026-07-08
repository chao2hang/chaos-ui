import type { Meta, StoryObj } from "@storybook/react"
import { SettlementStatusTag } from "@/components/business/settlement-status-tag"

const meta: Meta<typeof SettlementStatusTag> = {
  title: "Business/SettlementStatusTag",
  component: SettlementStatusTag,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
