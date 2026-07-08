import type { Meta, StoryObj } from "@storybook/react"
import { BarList } from "@/components/business/bar-list"

const meta: Meta<typeof BarList> = {
  title: "Business/BarList",
  component: BarList,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
