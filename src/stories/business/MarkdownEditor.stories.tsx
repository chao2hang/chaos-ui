import type { Meta, StoryObj } from "@storybook/react"
import { MarkdownEditor } from "@/components/business/markdown-editor"

const meta = {
  title: "Business/MarkdownEditor",
  component: MarkdownEditor,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof MarkdownEditor>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: "# Hello Markdown\n\n这是一段 **粗体** 和 *斜体* 文字。\n\n- 列表项 1\n- 列表项 2\n\n> 这是一段引用。",
    mode: "split",
    height: 350,
  },
}

export const EditorOnly: Story = {
  args: {
    value: "# 编辑模式\n\n只在编辑区工作，不显示预览。",
    mode: "editor",
    height: 300,
  },
}

export const PreviewOnly: Story = {
  args: {
    value: "# 预览模式\n\n只显示渲染后的 Markdown。\n\n```javascript\nconsole.log('code block');\n```",
    mode: "preview",
    height: 300,
  },
}

export const WithoutToolbar: Story = {
  args: {
    value: "纯文本编辑，无工具栏。",
    toolbar: false,
    mode: "editor",
    height: 200,
  },
}
