import type { Meta, StoryObj } from "@storybook/react"
import { RichTextEditor } from "@/components/business/rich-text-editor"

const meta = {
  title: "Business/RichTextEditor",
  component: RichTextEditor,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof RichTextEditor>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: "<h2>Hello World</h2><p>这是一个 <strong>富文本编辑器</strong>，支持加粗、斜体、列表等功能。</p>",
    placeholder: "请输入内容...",
    minHeight: 250,
  },
}

export const Empty: Story = {
  args: {
    value: "",
    placeholder: "开始输入你的内容...",
    minHeight: 200,
  },
}

export const ReadOnly: Story = {
  args: {
    value: "<h2>只读模式</h2><p>此内容不可编辑。</p>",
    editable: false,
    minHeight: 150,
  },
}

export const WithoutToolbar: Story = {
  args: {
    value: "<p>没有工具栏的编辑器，适合嵌入紧凑区域。</p>",
    showToolbar: false,
    minHeight: 120,
  },
}
