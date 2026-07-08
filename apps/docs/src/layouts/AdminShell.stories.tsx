import type { Meta, StoryObj } from "@storybook/react"
import { AdminShell } from "@/components/layout/admin-shell"

const meta: Meta<typeof AdminShell> = {
  title: "Layouts/AdminShell",
  component: AdminShell,
  tags: ["autodocs"],

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
