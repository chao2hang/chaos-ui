import type { Meta, StoryObj } from "@storybook/react"
import { OeeDashboard } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof OeeDashboard> = {
  title: "Business/OeeDashboard",
  component: OeeDashboard,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
