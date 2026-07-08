import type { Meta, StoryObj } from "@storybook/react"
import { ShippingWayBrowse } from "@/components/business/shipping-way-browse"

const meta: Meta<typeof ShippingWayBrowse> = {
  title: "Business/ShippingWayBrowse",
  component: ShippingWayBrowse,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
