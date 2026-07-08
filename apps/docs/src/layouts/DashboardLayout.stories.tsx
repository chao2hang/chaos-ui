import type { Meta, StoryObj } from "@storybook/react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

const meta: Meta<typeof DashboardLayout> = {
  title: "Layouts/DashboardLayout",
  component: DashboardLayout,
  tags: ["autodocs"],

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
