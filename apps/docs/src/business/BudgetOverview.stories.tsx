import type { Meta, StoryObj } from "@storybook/react"
import { BudgetOverview } from "@/components/business/budget-overview"

const meta: Meta<typeof BudgetOverview> = {
  title: "Business/BudgetOverview",
  component: BudgetOverview,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
