import type { Meta, StoryObj } from "@storybook/react"
import { RebutNodeSelect } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof RebutNodeSelect> = {
  title: "Business/RebutNodeSelect",
  component: RebutNodeSelect,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
