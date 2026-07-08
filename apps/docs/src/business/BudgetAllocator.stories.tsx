import type { Meta, StoryObj } from "@storybook/react"
import { BudgetAllocator } from "@/components/business/budget-allocator"

const meta: Meta<typeof BudgetAllocator> = {
  title: "Business/BudgetAllocator",
  component: BudgetAllocator,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
