import type { Meta, StoryObj } from "@storybook/react"
import { BatchGenealogyTree } from "@/components/business/batch-genealogy-tree"

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
