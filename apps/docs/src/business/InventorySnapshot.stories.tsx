import type { Meta, StoryObj } from "@storybook/react"
import { InventorySnapshot } from "@/components/business/inventory-snapshot"

const meta: Meta<typeof InventorySnapshot> = {
  title: "Business/InventorySnapshot",
  component: InventorySnapshot,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
