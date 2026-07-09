import type { Meta, StoryObj } from "@storybook/react"
import { BomTreeEditor } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof BomTreeEditor> = {
  title: "Business/BomTreeEditor",
  component: BomTreeEditor,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
