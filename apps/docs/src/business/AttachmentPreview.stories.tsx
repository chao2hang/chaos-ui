import type { Meta, StoryObj } from "@storybook/react"
import { AttachmentPreview } from "@/components/business/attachment-preview"

const meta: Meta<typeof AttachmentPreview> = {
  title: "Business/AttachmentPreview",
  component: AttachmentPreview,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
