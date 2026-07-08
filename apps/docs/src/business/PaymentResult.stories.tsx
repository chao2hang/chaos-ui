import type { Meta, StoryObj } from "@storybook/react"
import { PaymentResult } from "@/components/business/payment-result"

const meta: Meta<typeof PaymentResult> = {
  title: "Business/PaymentResult",
  component: PaymentResult,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
