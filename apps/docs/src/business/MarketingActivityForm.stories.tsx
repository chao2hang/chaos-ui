import type { Meta, StoryObj } from "@storybook/react"
import { MarketingActivityForm } from "@/components/business/marketing-activity-form"

const meta: Meta<typeof MarketingActivityForm> = {
  title: "Business/MarketingActivityForm",
  component: MarketingActivityForm,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
