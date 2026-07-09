import type { Meta, StoryObj } from "@storybook/react"
import { ProductBrowse } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof ProductBrowse> = {
  title: "Business/ProductBrowse",
  component: ProductBrowse,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
