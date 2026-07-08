import type { Meta, StoryObj } from "@storybook/react"
import { PurchaseOrderEditor } from "@/components/business/purchase-order-editor"

const meta: Meta<typeof PurchaseOrderEditor> = {
  title: "Business/PurchaseOrderEditor",
  component: PurchaseOrderEditor,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
