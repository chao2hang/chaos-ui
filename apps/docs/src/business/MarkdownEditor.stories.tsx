import type { Meta, StoryObj } from "@storybook/react"
import { MarkdownEditor } from "@/components/business/markdown-editor"

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
