import type { Meta, StoryObj } from "@storybook/react"
import { Callout } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof Callout> = {
  title: "Business/Callout",
  component: Callout,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
