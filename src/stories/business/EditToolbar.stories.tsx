import type { Meta, StoryObj } from "@storybook/react";
import { EditToolbar } from "@/components/business/edit-toolbar";

const meta = {
  title: "Business/CRUD/EditToolbar",
  component: EditToolbar,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof EditToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

export const Default: Story = {
  args: {
    onSave: noop,
    onCancel: noop,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    onSave: noop,
    onCancel: noop,
  },
};

export const WithDelete: Story = {
  args: {
    saveText: "Save changes",
    cancelText: "Discard",
    deleteText: "Delete item",
    onSave: noop,
    onCancel: noop,
    onDelete: noop,
  },
};

export const SaveDisabled: Story = {
  args: {
    saveDisabled: true,
    onSave: noop,
    onCancel: noop,
  },
};
