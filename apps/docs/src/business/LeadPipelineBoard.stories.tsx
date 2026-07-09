import type { Meta, StoryObj } from "@storybook/react"
import { LeadPipelineBoard } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof LeadPipelineBoard> = {
  title: "Business/LeadPipelineBoard",
  component: LeadPipelineBoard,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
