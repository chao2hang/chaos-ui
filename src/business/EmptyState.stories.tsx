import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "@/components/business/empty-state";
import { Button } from "@/components/ui/button";
import {
  InboxIcon,
  SearchXIcon,
  FileXIcon,
  AlertTriangleIcon,
} from "@/components/ui/icons";

const meta = {
  title: "Business/EmptyState",
  component: EmptyState,
  tags: ["autodocs", "a11y"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "search", "error", "network"],
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <EmptyState
      icon={InboxIcon}
      title="No items"
      description="Get started by creating a new item."
      action={<Button>Create Item</Button>}
    />
  ),
};

export const Search: Story = {
  args: { variant: "search" },
  render: () => (
    <EmptyState
      variant="search"
      icon={SearchXIcon}
      title="No results found"
      description="Try adjusting your search or filters"
    />
  ),
};

export const Error: Story = {
  args: { variant: "error" },
  render: () => (
    <EmptyState
      variant="error"
      icon={AlertTriangleIcon}
      title="Something went wrong"
      description="Please try again later"
      action={<Button>Retry</Button>}
    />
  ),
};

export const Empty: Story = {
  render: () => (
    <EmptyState
      icon={FileXIcon}
      title="No files"
      description="Upload your first file to get started"
      action={<Button>Upload File</Button>}
    />
  ),
};
