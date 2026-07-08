import type { Meta, StoryObj } from "@storybook/react"
import { DashboardCanvas } from "@/components/business/dashboard-canvas"

const meta: Meta<typeof DashboardCanvas> = {
  title: "Business/DashboardCanvas",
  component: DashboardCanvas,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
