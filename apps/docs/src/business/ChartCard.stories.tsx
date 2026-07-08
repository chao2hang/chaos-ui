import type { Meta, StoryObj } from "@storybook/react"
import { ChartCard } from "@/components/business/chart-card"

const meta: Meta<typeof ChartCard> = {
  title: "Business/ChartCard",
  component: ChartCard,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
