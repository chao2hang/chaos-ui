import type { Meta, StoryObj } from "@storybook/react";
import {
  ArchiveIcon,
  DownloadIcon,
  MailIcon,
  Trash2Icon,
} from "@/components/ui/icons";
import { BulkActionsToolbar } from "@/components/business/bulk-actions-toolbar";

const meta = {
  title: "Business/BulkActionsToolbar",
  component: BulkActionsToolbar,
  tags: ["autodocs", "a11y"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof BulkActionsToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 128,
    selectedCount: 8,
    onClear: () => undefined,
    actions: [
      { label: "Export", icon: <DownloadIcon />, onClick: () => undefined },
      { label: "Archive", icon: <ArchiveIcon />, onClick: () => undefined },
      {
        label: "Delete",
        icon: <Trash2Icon />,
        variant: "destructive",
        onClick: () => undefined,
      },
    ],
  },
};

export const EmptySelection: Story = {
  args: {
    count: 128,
    selectedCount: 0,
    actions: [
      { label: "Export", icon: <DownloadIcon />, onClick: () => undefined },
    ],
  },
};

export const WithDisabledAction: Story = {
  args: {
    count: 42,
    selectedCount: 3,
    label: "Audiences selected",
    actions: [
      { label: "Email", icon: <MailIcon />, onClick: () => undefined },
      {
        label: "Archive",
        icon: <ArchiveIcon />,
        disabled: true,
        onClick: () => undefined,
      },
    ],
    onClear: () => undefined,
  },
};
