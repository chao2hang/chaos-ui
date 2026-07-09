import type { Meta, StoryObj } from "@storybook/react"
import { SubformTabs } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof SubformTabs> = {
  title: "Business/SubformTabs",
  component: SubformTabs,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
