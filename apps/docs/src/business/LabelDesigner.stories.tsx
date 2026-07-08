import type { Meta, StoryObj } from "@storybook/react"
import { LabelDesigner } from "@/components/business/label-designer"

const meta: Meta<typeof LabelDesigner> = {
  title: "Business/LabelDesigner",
  component: LabelDesigner,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
