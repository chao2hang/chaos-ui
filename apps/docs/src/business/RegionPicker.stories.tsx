import type { Meta, StoryObj } from "@storybook/react"
import { RegionPicker } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof RegionPicker> = {
  title: "Business/RegionPicker",
  component: RegionPicker,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
