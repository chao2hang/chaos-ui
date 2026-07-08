import type { Meta, StoryObj } from "@storybook/react"
import { WarehousePicker } from "@/components/business/warehouse-picker"

const meta: Meta<typeof WarehousePicker> = {
  title: "Business/WarehousePicker",
  component: WarehousePicker,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
