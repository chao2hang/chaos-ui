import type { Meta, StoryObj } from "@storybook/react"
import { VersionHistory } from "@/components/business/version-history"

const versions = [
  {
    id: "v3",
    version: "v3",
    title: "Launch approval copy",
    author: "Lina Chen",
    timestamp: "Today 10:42",
    current: true,
    changes: ["Updated offer headline", "Raised daily budget cap"],
  },
  {
    id: "v2",
    version: "v2",
    title: "Budget review",
    author: "Marco Silva",
    timestamp: "Yesterday 16:20",
    description: "Finance adjusted spend pacing before approval.",
  },
]

const meta = {
  title: "Business/VersionHistory",
  component: VersionHistory,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof VersionHistory>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    versions,
    onRestore: () => undefined,
  },
}

export const ReadOnly: Story = {
  args: {
    versions,
  },
}

