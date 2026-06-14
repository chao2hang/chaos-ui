import type { Meta, StoryObj } from "@storybook/react"
import { PermissionMatrix } from "@/components/business/permission-matrix"

const roles = [
  { id: "admin", label: "Admin" },
  { id: "manager", label: "Manager" },
  { id: "viewer", label: "Viewer" },
]

const resources = [
  { id: "campaigns", label: "Campaigns", description: "Create and manage campaigns", permissions: ["read", "write", "delete"] },
  { id: "reports", label: "Reports", description: "Access analytics reports", permissions: ["read", "export"] },
]

const meta = {
  title: "Business/PermissionMatrix",
  component: PermissionMatrix,
  tags: ["autodocs", "a11y"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof PermissionMatrix>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    roles,
    resources,
    value: {
      admin: { campaigns: ["read", "write", "delete"], reports: ["read", "export"] },
      manager: { campaigns: ["read", "write"], reports: ["read"] },
      viewer: { campaigns: ["read"], reports: ["read"] },
    },
    onChange: () => undefined,
  },
}

export const ReadOnly: Story = {
  args: {
    ...Default.args,
    readOnly: true,
  },
}

