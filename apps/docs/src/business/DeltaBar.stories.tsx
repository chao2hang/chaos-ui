import type { Meta, StoryObj } from "@storybook/react"
import { DeltaBar } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof DeltaBar> = {
  title: "Business/DeltaBar",
  component: DeltaBar,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
