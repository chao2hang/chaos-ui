import type { Meta, StoryObj } from "@storybook/react"
import { InvoiceSummary } from "@/components/business/invoice-summary"

const meta: Meta<typeof InvoiceSummary> = {
  title: "Business/InvoiceSummary",
  component: InvoiceSummary,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
