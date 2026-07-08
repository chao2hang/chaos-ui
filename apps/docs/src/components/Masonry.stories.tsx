import type { Meta, StoryObj } from "@storybook/react"
import { Masonry } from "@/components/ui/masonry"

const meta: Meta<typeof Masonry> = {
  title: "Components/Masonry",
  component: Masonry,
  tags: ["autodocs"],

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
