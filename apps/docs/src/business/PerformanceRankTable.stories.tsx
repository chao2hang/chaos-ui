import type { Meta, StoryObj } from "@storybook/react"
import { PerformanceRankTable } from "@/components/business/performance-rank-table"

const meta: Meta<typeof PerformanceRankTable> = {
  title: "Business/PerformanceRankTable",
  component: PerformanceRankTable,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
