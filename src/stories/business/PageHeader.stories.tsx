import type { Meta, StoryObj } from "@storybook/react";
import { PageHeader } from "@/components/business/page-header";
import { Button } from "@/components/ui/button";
import { PlusIcon, DownloadIcon } from "@/components/ui/icons";

const meta = {
  title: "Business/PageHeader",
  component: PageHeader,
  tags: ["autodocs", "a11y"],
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <PageHeader
      title="Users"
      description="Manage your team members and permissions"
    />
  ),
};

export const WithActions: Story = {
  render: () => (
    <PageHeader
      title="Users"
      description="Manage your team members"
      actions={
        <>
          <Button variant="outline">
            <DownloadIcon className="mr-1 size-4" />
            Export
          </Button>
          <Button>
            <PlusIcon className="mr-1 size-4" />
            Add User
          </Button>
        </>
      }
    />
  ),
};

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
};

/** Compact title for document/detail pages (issue #44). */
export const SizeSm: Story = {
  render: () => (
    <PageHeader
      title="Order #1024"
      description="Bill and line items"
      size="sm"
      actions={<Button size="sm">Save</Button>}
    />
  ),
};
