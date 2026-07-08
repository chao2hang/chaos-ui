import type { Meta, StoryObj } from "@storybook/react"
import { PasteUpload } from "@/components/business/paste-upload"

const meta: Meta<typeof PasteUpload> = {
  title: "Business/PasteUpload",
  component: PasteUpload,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
