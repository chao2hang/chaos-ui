import type { Meta, StoryObj } from "@storybook/react"
import { RichTextEditor } from "@chaos_team/chaos-ui/business"
import { CodeEditor } from "@chaos_team/chaos-ui/business"
import { useState } from "react"

const meta = {
  title: "Business/Heavy",
  parameters: { layout: "padded" },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const RichTextExample: Story = {
  render: () => {
    const [value, setValue] = useState(
      "<h1>欢迎使用 Chaos UI 富文本编辑器</h1><p>这是一个基于 <strong>TipTap</strong> 的富文本编辑器，支持：</p><ul><li>加粗、斜体、删除线</li><li>无序/有序列表</li><li>链接、图片</li><li>代码块、引用</li></ul><blockquote>简洁即美 — 设计原则</blockquote><p>试试编辑这段文字。</p>"
    )
    return (
      <div className="max-w-3xl space-y-3">
        <h3 className="text-sm font-medium">RichTextEditor (TipTap)</h3>
        <RichTextEditor value={value} onChange={setValue} minHeight={300} />
      </div>
    )
  },
}

export const CodeEditorExample: Story = {
  render: () => {
    const [js, setJs] = useState(`// TypeScript 编辑器
import { useState } from "react"

export function Counter() {
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  )
}
`)
    const [json, setJson] = useState(`{
  "name": "chaos-ui",
  "version": "1.0.0",
  "dependencies": {
    "react": "^19.0.0",
    "next": "^16.0.0"
  }
}`)
    const [css, setCss] = useState(`/* CSS 编辑器 */
.alert {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid;
}
`)

    return (
      <div className="max-w-4xl space-y-6">
        <section className="space-y-2">
          <h3 className="text-sm font-medium">TypeScript</h3>
          <CodeEditor
            value={js}
            onChange={setJs}
            language="typescript"
            minHeight={260}
          />
        </section>
        <section className="space-y-2">
          <h3 className="text-sm font-medium">JSON</h3>
          <CodeEditor
            value={json}
            onChange={setJson}
            language="json"
            minHeight={200}
          />
        </section>
        <section className="space-y-2">
          <h3 className="text-sm font-medium">CSS</h3>
          <CodeEditor
            value={css}
            onChange={setCss}
            language="css"
            minHeight={220}
          />
        </section>
      </div>
    )
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="max-w-4xl space-y-8">
      <section>
        <h3 className="mb-3 text-base font-semibold">RichTextEditor</h3>
        <RichTextEditor value="<p>Hello <strong>Chaos UI</strong>!</p>" onChange={() => {}} />
      </section>
      <section>
        <h3 className="mb-3 text-base font-semibold">CodeEditor (Read-only)</h3>
        <CodeEditor
          value='const greeting = "Hello, Chaos UI!"'
          language="javascript"
          readOnly
          minHeight={120}
        />
      </section>
    </div>
  ),
}
