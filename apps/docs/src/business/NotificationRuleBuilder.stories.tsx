import type { Meta, StoryObj } from "@storybook/react"
import { NotificationRuleBuilder } from "@/components/business/notification-rule-builder"

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
