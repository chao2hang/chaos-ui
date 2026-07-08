import type { Meta, StoryObj } from "@storybook/react"
import { AttachmentUploader } from "@/components/business/attachment-uploader"

const meta: Meta<typeof AttachmentUploader> = {
  title: "Business/AttachmentUploader",
  component: AttachmentUploader,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
