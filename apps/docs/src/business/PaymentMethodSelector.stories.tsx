import type { Meta, StoryObj } from "@storybook/react"
import { PaymentMethodSelector } from "@chaos_team/chaos-ui/business"

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
