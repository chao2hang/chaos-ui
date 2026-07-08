import type { Meta, StoryObj } from "@storybook/react"
import { ReconciliationSummary } from "@/components/business/reconciliation-summary"

const meta: Meta<typeof ReconciliationSummary> = {
  title: "Business/ReconciliationSummary",
  component: ReconciliationSummary,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
