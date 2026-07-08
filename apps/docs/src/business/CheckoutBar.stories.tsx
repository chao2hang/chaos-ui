import type { Meta, StoryObj } from "@storybook/react"
import { CheckoutBar } from "@/components/business/checkout-bar"

const meta: Meta<typeof CheckoutBar> = {
  title: "Business/CheckoutBar",
  component: CheckoutBar,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
