import type { Meta, StoryObj } from "@storybook/react"
import { BarListCard } from "@/components/business/bar-list-card"

const meta: Meta<typeof BarListCard> = {
  title: "Business/BarListCard",
  component: BarListCard,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
