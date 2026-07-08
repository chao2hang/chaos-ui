import type { Meta, StoryObj } from "@storybook/react"
import { AttachmentList } from "@/components/business/attachment-list"

const meta: Meta<typeof AttachmentList> = {
  title: "Business/AttachmentList",
  component: AttachmentList,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
