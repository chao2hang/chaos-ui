import type { Meta, StoryObj } from "@storybook/react";
import { PermissionWrapper } from "@/components/business/permission-wrapper";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Business/Auth/PermissionWrapper",
  component: PermissionWrapper,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { code: "admin", children: null },
} satisfies Meta<typeof PermissionWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Granted: Story = {
  args: {
    code: "read",
    check: () => true,
    children: <div className="rounded border p-4"><p>Authorized content</p><Button>Action</Button></div>,
  },
};

export const DeniedHide: Story = {
  args: {
    code: "admin",
    check: () => false,
    mode: "hide",
    fallback: <p className="text-sm text-muted-foreground">You don&apos;t have permission to view this.</p>,
    children: <p>Secret content</p>,
  },
};

export const DeniedDisable: Story = {
  args: {
    code: "write",
    check: () => false,
    mode: "disable",
    children: <Button>Locked action</Button>,
  },
};
