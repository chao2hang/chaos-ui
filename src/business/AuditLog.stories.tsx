import type { Meta, StoryObj } from "@storybook/react"
import { AuditLog, type AuditLogEntry } from "@/components/business/audit-log"

const entries: AuditLogEntry[] = [
  {
    id: "1",
    actor: { name: "Lina Chen", description: "Growth lead" },
    action: "approved",
    target: "Spring Launch campaign",
    timestamp: "10:42",
    status: "success",
    details: "Changed status from Pending review to Approved.",
  },
  {
    id: "2",
    actor: { name: "Marco Silva", description: "Finance" },
    action: "updated budget for",
    target: "Partner Push",
    timestamp: "09:18",
    status: "warning",
    details: "Monthly cap increased from $80,000 to $96,000.",
  },
]

const meta = {
  title: "Business/AuditLog",
  component: AuditLog,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof AuditLog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { entries },
}

export const Empty: Story = {
  args: { entries: [] },
}

