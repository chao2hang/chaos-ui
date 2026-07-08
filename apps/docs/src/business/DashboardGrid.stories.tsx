import type { Meta, StoryObj } from "@storybook/react"
import { DashboardGrid } from "@/components/business/dashboard-grid"

const meta: Meta<typeof DashboardGrid> = {
  title: "Business/DashboardGrid",
  component: DashboardGrid,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
