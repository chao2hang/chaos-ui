import type { Meta, StoryObj } from "@storybook/react"
import { StockTransferDialog } from "@/components/business/stock-transfer-dialog"

const meta: Meta<typeof StockTransferDialog> = {
  title: "Business/StockTransferDialog",
  component: StockTransferDialog,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
