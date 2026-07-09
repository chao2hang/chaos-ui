import type { Meta, StoryObj } from "@storybook/react"
import { PoolTrackerTable } from "@chaos_team/chaos-ui/business"

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
