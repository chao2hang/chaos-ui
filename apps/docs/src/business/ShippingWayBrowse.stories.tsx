import type { Meta, StoryObj } from "@storybook/react"
import { ShippingWayBrowse } from "@chaos_team/chaos-ui/business"

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
