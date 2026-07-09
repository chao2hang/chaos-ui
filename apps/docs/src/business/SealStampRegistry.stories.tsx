import type { Meta, StoryObj } from "@storybook/react"
import { SealStampRegistry } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof SealStampRegistry> = {
  title: "Business/SealStampRegistry",
  component: SealStampRegistry,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
