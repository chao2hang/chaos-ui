import type { Meta, StoryObj } from "@storybook/react"
import { CommissionCalculator } from "@/components/business/commission-calculator"

const meta: Meta<typeof CommissionCalculator> = {
  title: "Business/CommissionCalculator",
  component: CommissionCalculator,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
