import type { Meta, StoryObj } from "@storybook/react"
import { ProductCategoryPicker } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof ProductCategoryPicker> = {
  title: "Business/ProductCategoryPicker",
  component: ProductCategoryPicker,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
