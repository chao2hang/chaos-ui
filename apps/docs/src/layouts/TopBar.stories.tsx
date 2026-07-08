import type { Meta, StoryObj } from "@storybook/react"
import { TopBar } from "@/components/layout/top-bar"

const meta: Meta<typeof TopBar> = {
  title: "Layouts/TopBar",
  component: TopBar,
  tags: ["autodocs"],

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
