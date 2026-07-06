import type { Meta, StoryObj } from "@storybook/react";
import { PermissionButton } from "@/components/business/permission-button";

const meta = {
  title: "Business/Auth/PermissionButton",
  component: PermissionButton,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof PermissionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Granted: Story = {
  args: {
    permission: "edit",
    permissions: ["read", "edit", "admin"],
    children: "Edit",
  },
};

export const DeniedHide: Story = {
  args: {
    permission: "admin",
    permissions: ["read"],
    mode: "hide",
    children: "Admin action",
  },
};

export const DeniedDisable: Story = {
  args: {
    permission: "delete",
    permissions: ["read"],
    mode: "disable",
    children: "Delete",
  },
};

export const WithClick: Story = {
  args: {
    permission: "submit",
    permissions: ["submit"],
    children: "Submit",
    onClick: () => {},
  },
};
