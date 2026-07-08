import type { Meta, StoryObj } from "@storybook/react"
import { Menu } from "@/components/ui/menu"

const meta: Meta<typeof Menu> = {
  title: "Components/Menu",
  component: Menu,
  tags: ["autodocs"],

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
