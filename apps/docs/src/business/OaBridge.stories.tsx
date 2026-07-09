import type { Meta, StoryObj } from "@storybook/react"
import { OaBridge } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof OaBridge> = {
  title: "Business/OaBridge",
  component: OaBridge,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
