import type { Meta, StoryObj } from "@storybook/react"
import { NavigationTabsBar } from "@/components/layout/navigation-tabs-bar"

const meta: Meta<typeof NavigationTabsBar> = {
  title: "Layouts/NavigationTabsBar",
  component: NavigationTabsBar,
  tags: ["autodocs"],

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
