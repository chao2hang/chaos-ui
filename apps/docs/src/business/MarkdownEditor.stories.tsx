import type { Meta, StoryObj } from "@storybook/react"
import { MarkdownEditor } from "@chaos_team/chaos-ui/business"

const meta: Meta<typeof MarkdownEditor> = {
  title: "Business/MarkdownEditor",
  component: MarkdownEditor,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
