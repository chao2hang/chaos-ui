import type { Meta, StoryObj } from "@storybook/react"
import { SerialNumberManager } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof SerialNumberManager> = {
  title: "Business/SerialNumberManager",
  component: SerialNumberManager,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
