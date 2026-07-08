import type { Meta, StoryObj } from "@storybook/react"
import { DockPanel } from "@/components/business/dock-panel"

const meta: Meta<typeof DockPanel> = {
  title: "Business/DockPanel",
  component: DockPanel,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
