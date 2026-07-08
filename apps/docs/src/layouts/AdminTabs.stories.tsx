import type { Meta, StoryObj } from "@storybook/react"
import { AdminTabs } from "@/components/layout/admin-tabs"

const meta: Meta<typeof AdminTabs> = {
  title: "Layouts/AdminTabs",
  component: AdminTabs,
  tags: ["autodocs"],

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
