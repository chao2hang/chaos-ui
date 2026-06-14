import type { Meta, StoryObj } from "@storybook/react"
import { ExportButton } from "@/components/business/export-button"

type ExportRow = {
  campaign: string
  owner: string
  spend: number
  status: string
}

const rows: ExportRow[] = [
  { campaign: "Spring launch", owner: "Lina", spend: 42800, status: "Active" },
  { campaign: "Partner push", owner: "Marco", spend: 18200, status: "Paused" },
]

const meta = {
  title: "Business/ExportButton",
  component: ExportButton,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof ExportButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: rows,
    filename: "campaign-report",
    columns: [
      { key: "campaign", header: "Campaign" },
      { key: "owner", header: "Owner" },
      { key: "spend", header: "Spend", format: (value) => `$${value}` },
      { key: "status", header: "Status" },
    ],
  },
}

export const SingleFormat: Story = {
  args: {
    data: rows,
    filename: "campaign-report",
    formats: ["csv"],
    label: "Download CSV",
  },
}

export const DisabledDataset: Story = {
  args: {
    data: [],
    filename: "empty-report",
    formats: ["json", "csv"],
    variant: "secondary",
  },
}

