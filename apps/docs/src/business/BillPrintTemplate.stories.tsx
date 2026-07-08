import type { Meta, StoryObj } from "@storybook/react"
import { BillPrintTemplate } from "@/components/business/bill-print-template"

const meta: Meta<typeof BillPrintTemplate> = {
  title: "Business/BillPrintTemplate",
  component: BillPrintTemplate,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
