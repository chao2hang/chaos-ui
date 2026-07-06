import type { Meta, StoryObj } from "@storybook/react";
import { CrudToolbar } from "@/components/business/crud-toolbar";
import { PlusIcon, DownloadIcon } from "@/components/ui/icons";

const noop = () => {};

const meta = {
  title: "Business/CRUD/CrudToolbar",
  component: CrudToolbar,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof CrudToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    primaryActions: [
      { key: "add", label: "Add", icon: PlusIcon, onClick: noop },
    ],
    showSearch: true,
    searchPlaceholder: "Search...",
    onSearch: (v) => { void v; },
  },
};

export const WithSelection: Story = {
  args: {
    showSearch: true,
    selectionCount: 3,
    bulkActionLabel: "Bulk delete",
    moreActions: [
      { key: "export", label: "Export", icon: DownloadIcon, onClick: noop },
    ],
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    primaryActions: [{ key: "add", label: "Add", icon: PlusIcon, onClick: noop }],
  },
};
