import type { Meta, StoryObj } from "@storybook/react"
import { PasteUpload } from "@chaos_team/chaos-ui/business"

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
