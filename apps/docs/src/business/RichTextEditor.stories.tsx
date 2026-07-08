import type { Meta, StoryObj } from "@storybook/react"
import { RichTextEditor } from "@/components/business/rich-text-editor"

const meta: Meta<typeof RichTextEditor> = {
  title: "Business/RichTextEditor",
  component: RichTextEditor,
  tags: ["autodocs"],
  parameters: { layout: "padded" };

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "开始输入...",
  },
}

export const WithContent: Story = {
  args: {
    value: "<h1>标题</h1><p>这是一段 <strong>富文本</strong> 内容。</p><ul><li>列表项 1</li><li>列表项 2</li></ul>",
  },
}

export const Readonly: Story = {
  args: {
    value: "<p>只读模式，无法编辑。</p>",
    editable: false,
    showToolbar: false,
  },
}

export const Dark: Story = {
  args: {
    placeholder: "暗色主题编辑器",
  },
  parameters: { backgrounds: { default: "dark" } },
}
