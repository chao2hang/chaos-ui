import type { Meta, StoryObj } from "@storybook/react"
import { SplitScreen } from "@/components/layout/split-screen"

const meta: Meta<typeof SplitScreen> = {
  title: "Layouts/SplitScreen",
  component: SplitScreen,
  tags: ["autodocs"],

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
