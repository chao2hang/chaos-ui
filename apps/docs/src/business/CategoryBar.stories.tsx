import type { Meta, StoryObj } from "@storybook/react"
import { CategoryBar } from "@/components/business/category-bar"

const meta: Meta<typeof CategoryBar> = {
  title: "Business/CategoryBar",
  component: CategoryBar,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
