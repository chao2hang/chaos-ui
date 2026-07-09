import type { Meta, StoryObj } from "@storybook/react"
import { NotificationRuleBuilder } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof NotificationRuleBuilder> = {
  title: "Business/NotificationRuleBuilder",
  component: NotificationRuleBuilder,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
