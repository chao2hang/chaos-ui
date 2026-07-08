import type { Meta, StoryObj } from "@storybook/react"
import { PoolTrackerTable } from "@/components/business/pool-tracker-table"

const meta: Meta<typeof PoolTrackerTable> = {
  title: "Business/PoolTrackerTable",
  component: PoolTrackerTable,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
