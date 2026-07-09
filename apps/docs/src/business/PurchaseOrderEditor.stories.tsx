import type { Meta, StoryObj } from "@storybook/react"
import { PurchaseOrderEditor } from "@chaos_team/chaos-ui/business"

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
