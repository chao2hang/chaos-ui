import type { Meta, StoryObj } from "@storybook/react"
import { OverviewPage } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof OverviewPage> = {
  title: "Business/OverviewPage",
  component: OverviewPage,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
