import type { Meta, StoryObj } from "@storybook/react"
import { ChatArtifactPanel } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof ChatArtifactPanel> = {
  title: "Business/ChatArtifactPanel",
  component: ChatArtifactPanel,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
