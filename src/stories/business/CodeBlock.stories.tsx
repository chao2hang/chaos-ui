import type { Meta, StoryObj } from "@storybook/react"
import { CodeBlock } from "@/components/business/code-block"

const sampleCode = `import { Button } from "@/components/ui/button"

export function CampaignAction() {
  return <Button>Launch campaign</Button>
}`

const meta = {
  title: "Business/CodeBlock",
  component: CodeBlock,
  tags: ["autodocs", "a11y"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof CodeBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    code: sampleCode,
    language: "ts",
    filename: "campaign-action.tsx",
  },
}

export const HighlightedLines: Story = {
  args: {
    code: sampleCode,
    language: "ts",
    filename: "campaign-action.tsx",
    highlightLines: [3],
  },
}

export const CompactJson: Story = {
  args: {
    code: JSON.stringify({ audience: "returning_customers", budget: 125000, active: true }, null, 2),
    language: "json",
    showLineNumbers: false,
    showCopy: false,
    maxHeight: 240,
  },
}

