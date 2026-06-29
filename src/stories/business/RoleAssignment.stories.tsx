import type { Meta, StoryObj } from "@storybook/react"
import { RoleAssignment } from "@/components/business/role-assignment"

const principals = [
  { id: "growth", name: "Growth team", description: "Owns acquisition campaigns" },
  { id: "finance", name: "Finance team", description: "Reviews budget and spend" },
]

const roles = [
  { id: "owner", label: "Owner", description: "Full access to assigned workspaces" },
  { id: "editor", label: "Editor", description: "Can edit campaign content" },
  { id: "approver", label: "Approver", description: "Can approve launch requests" },
  { id: "viewer", label: "Viewer", description: "Read-only access" },
]

const meta = {
  title: "Business/RoleAssignment",
  component: RoleAssignment,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof RoleAssignment>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    principals,
    roles,
    value: {
      growth: ["owner", "editor"],
      finance: ["approver", "viewer"],
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

