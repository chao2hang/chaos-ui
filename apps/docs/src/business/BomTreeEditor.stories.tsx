import type { Meta, StoryObj } from "@storybook/react"
import { BomTreeEditor } from "@/components/business/bom-tree-editor"

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
