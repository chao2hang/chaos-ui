import type { Meta, StoryObj } from "@storybook/react"
import { CodeBlock } from "@/components/business/code-block"

const sampleCode = `import { useState } from "react"

export function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}`

const meta: Meta<typeof CodeBlock> = {
  title: "Business/CodeBlock",
  component: CodeBlock,
  tags: ["autodocs"],
  parameters: { layout: "padded" };

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    code: sampleCode,
    language: "ts",
    filename: "counter.tsx",
  },
}

export const HighlightLines: Story = {
  args: {
    code: sampleCode,
    language: "ts",
    filename: "counter.tsx",
    highlightLines: [1, 5],
  },
}

export const NoLineNumbers: Story = {
  args: {
    code: 'console.log("hello")',
    language: "js",
    showLineNumbers: false,
    showCopy: false,
  },
}

export const Dark: Story = {
  args: {
    code: sampleCode,
    language: "ts",
    filename: "counter.tsx",
  },
  parameters: { backgrounds: { default: "dark" } },
}
