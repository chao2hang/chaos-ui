import type { Meta, StoryObj } from "@storybook/react"
import { InvoiceManager } from "@/components/business/invoice-manager"

const meta: Meta<typeof InvoiceManager> = {
  title: "Business/InvoiceManager",
  component: InvoiceManager,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
