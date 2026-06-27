import type { Meta, StoryObj } from "@storybook/react"
import { AvatarGroup, type AvatarUser } from "@/components/business/avatar-group"
import { Button } from "@/components/ui/button"

const users: AvatarUser[] = [
  { name: "Lina Chen" },
  { name: "Marco Silva" },
  { name: "Avery Stone" },
  { name: "Noah Patel" },
  { name: "Mia Wong" },
  { name: "Iris Kim" },
]

const meta = {
  title: "Business/AvatarGroup",
  component: AvatarGroup,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof AvatarGroup>

export default meta
type Story = StoryObj

export const Default: Story = {
  args: {
    users,
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <AvatarGroup users={users} size="sm" />
      <AvatarGroup users={users} size="default" />
      <AvatarGroup users={users} size="lg" />
      <AvatarGroup users={users} size="xl" />
    </div>
  ),
}

export const WithoutOverflow: Story = {
  args: {
    users: users.slice(0, 3),
    showOverflow: false,
  },
}

export const ApprovalTeam: Story = {
  render: () => (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div>
        <p className="text-sm font-medium">Campaign approval team</p>
        <p className="text-xs text-muted-foreground">6 reviewers assigned</p>
      </div>
      <div className="flex items-center gap-3">
        <AvatarGroup users={users} max={4} />
        <Button size="sm" variant="outline">Manage</Button>
      </div>
    </div>
  ),
}

