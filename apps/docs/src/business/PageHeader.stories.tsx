import type { Meta, StoryObj } from "@storybook/react"
import { PageHeader } from "@chaos_team/chaos-ui/business"
import { Button } from "@chaos_team/chaos-ui/ui"
import { PlusIcon, DownloadIcon } from "lucide-react"

const meta: Meta<typeof PageHeader> = {
  title: "Business/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
};
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <PageHeader
      title="Users"
      description="Manage your team members and permissions"
    />
  ),
}

export const WithActions: Story = {
  render: () => (
    <PageHeader
      title="Users"
      description="Manage your team members"
      actions={
        <>
          <Button variant="outline">
            <DownloadIcon className="size-4 mr-1" />
            Export
          </Button>
          <Button>
            <PlusIcon className="size-4 mr-1" />
            Add User
          </Button>
        </>
      }
    />
  ),
}

export const WithBreadcrumb: Story = {
  render: () => (
    <PageHeader
      title="User Details"
      description="View and edit user information"
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Users", href: "/users" },
        { label: "John Doe" },
      ]}
      actions={<Button variant="outline">Edit</Button>}
    />
  ),
}
