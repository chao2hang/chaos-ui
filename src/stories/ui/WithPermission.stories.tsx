import type { Meta, StoryObj } from "@storybook/react";
import { WithPermission } from "@/components/ui/with-permission";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Components/WithPermission",
  component: WithPermission,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof WithPermission>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Allowed: Story = {
  args: {
    permissions: ["orders:read", "orders:write"],
    require: "orders:write",
    mode: "any",
    children: <Button>You can edit orders</Button>,
  },
};

export const Forbidden: Story = {
  args: {
    permissions: ["orders:read"],
    require: "orders:write",
    mode: "any",
    fallback: (
      <span className="text-muted-foreground text-sm">
        You don&apos;t have permission to edit orders.
      </span>
    ),
    children: <Button>You can edit orders</Button>,
  },
};

export const RequireAll: Story = {
  args: {
    permissions: ["orders:read", "orders:write", "orders:delete"],
    require: ["orders:read", "orders:write"],
    mode: "all",
    children: <Button>Read + write both granted</Button>,
  },
};

export const RequireAllDenied: Story = {
  args: {
    permissions: ["orders:read"],
    require: ["orders:read", "orders:write"],
    mode: "all",
    fallback: (
      <span className="text-muted-foreground text-sm">
        Missing one of the required permissions.
      </span>
    ),
    children: <Button>Read + write both granted</Button>,
  },
};

export const NoPermissions: Story = {
  args: {
    require: "orders:write",
    mode: "any",
    fallback: (
      <span className="text-muted-foreground text-sm">
        No permissions assigned to this user.
      </span>
    ),
    children: <Button>You can edit orders</Button>,
  },
};
