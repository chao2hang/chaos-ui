import type { Meta, StoryObj } from "@storybook/react"
import { StatCardWithDelta } from "@/components/business/stat-card-with-delta"

const meta: Meta<typeof StatCardWithDelta> = {
  title: "Business/StatCardWithDelta",
  component: StatCardWithDelta,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
