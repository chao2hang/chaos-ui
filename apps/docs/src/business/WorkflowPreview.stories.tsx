import type { Meta, StoryObj } from "@storybook/react"
import { WorkflowPreview } from "@/components/business/workflow-preview"

const meta: Meta<typeof WorkflowPreview> = {
  title: "Business/WorkflowPreview",
  component: WorkflowPreview,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
