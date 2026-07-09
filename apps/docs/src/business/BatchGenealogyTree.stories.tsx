import type { Meta, StoryObj } from "@storybook/react"
import { BatchGenealogyTree } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof BatchGenealogyTree> = {
  title: "Business/BatchGenealogyTree",
  component: BatchGenealogyTree,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
