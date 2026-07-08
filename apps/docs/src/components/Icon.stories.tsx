import type { Meta, StoryObj } from "@storybook/react"
import { Icon } from "@/components/ui/icon"

const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  tags: ["autodocs"],

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
