import type { Meta, StoryObj } from "@storybook/react"
import { WarehouseBrowse } from "@/components/business/warehouse-browse"

const meta: Meta<typeof WarehouseBrowse> = {
  title: "Business/WarehouseBrowse",
  component: WarehouseBrowse,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
