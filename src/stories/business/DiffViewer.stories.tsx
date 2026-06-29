import type { Meta, StoryObj } from "@storybook/react"
import { DiffViewer } from "@/components/business/diff-viewer"

const meta = {
  title: "Business/DiffViewer",
  component: DiffViewer,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof DiffViewer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { field: "status", label: "Status", before: "Draft", after: "Approved", type: "changed" },
      { field: "budget", label: "Budget", before: "$80,000", after: "$96,000", type: "changed" },
      { field: "owner", label: "Owner", after: "Lina Chen", type: "added" },
      { field: "legacyId", label: "Legacy ID", before: "CMP-001", type: "removed" },
    ],
  },
}

export const VersionCompare: Story = {
  args: {
    beforeLabel: "v2",
    afterLabel: "v3",
    items: Default.args?.items,
  },
}

