import type { Meta, StoryObj } from "@storybook/react"
import { BulkImportWizard } from "@/components/business/bulk-import-wizard"

const mappings = [
  { source: "Campaign Name", target: "name" },
  { source: "Owner Email", target: "ownerEmail" },
  { source: "Budget", target: "budget" },
]

const validationRows = [
  { row: 2, status: "valid" as const, message: "Ready to import" },
  { row: 8, status: "warning" as const, message: "Budget is unusually high" },
  { row: 11, status: "error" as const, message: "Missing owner email" },
]

const meta = {
  title: "Business/BulkImportWizard",
  component: BulkImportWizard,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof BulkImportWizard>

export default meta
type Story = StoryObj<typeof meta>

export const Upload: Story = {
  args: {
    step: "upload",
    onUpload: () => undefined,
  },
}

export const Mapping: Story = {
  args: {
    step: "mapping",
    filename: "campaigns.csv",
    mappings,
  },
}

export const Validation: Story = {
  args: {
    step: "validation",
    progress: 72,
    validationRows,
  },
}

export const Complete: Story = {
  args: {
    step: "complete",
    importedCount: 284,
  },
}

