import type { Meta, StoryObj } from "@storybook/react"
import { DonutCard } from "@/components/business/donut-card"

const meta: Meta<typeof DonutCard> = {
  title: "Business/DonutCard",
  component: DonutCard,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
