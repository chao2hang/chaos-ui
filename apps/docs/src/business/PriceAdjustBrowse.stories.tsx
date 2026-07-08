import type { Meta, StoryObj } from "@storybook/react"
import { PriceAdjustBrowse } from "@/components/business/price-adjust-browse"

const meta: Meta<typeof PriceAdjustBrowse> = {
  title: "Business/PriceAdjustBrowse",
  component: PriceAdjustBrowse,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
