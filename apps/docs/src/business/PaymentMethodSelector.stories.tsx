import type { Meta, StoryObj } from "@storybook/react"
import { PaymentMethodSelector } from "@/components/business/payment-method-selector"

const meta: Meta<typeof PaymentMethodSelector> = {
  title: "Business/PaymentMethodSelector",
  component: PaymentMethodSelector,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
