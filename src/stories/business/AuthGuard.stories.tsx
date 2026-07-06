import type { Meta, StoryObj } from "@storybook/react";
import { AuthGuard } from "@/components/business/auth-guard";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Business/Auth/AuthGuard",
  component: AuthGuard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { permission: "admin", children: null },
} satisfies Meta<typeof AuthGuard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Granted: Story = {
  args: {
    permission: "read",
    check: () => true,
    children: <Button>Visible content</Button>,
  },
};

export const DeniedHide: Story = {
  args: {
    permission: "admin",
    check: () => false,
    mode: "hide",
    fallback: <p className="text-sm text-muted-foreground">You don&apos;t have access.</p>,
    children: <Button>Should be hidden</Button>,
  },
};

export const DeniedDisable: Story = {
  args: {
    permission: "write",
    check: () => false,
    mode: "disable",
    children: <Button>Disabled button</Button>,
  },
};
