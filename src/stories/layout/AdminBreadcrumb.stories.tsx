import type { Meta, StoryObj } from "@storybook/react";
import { AdminBreadcrumb } from "@/components/layout/admin-breadcrumb";

const meta = {
  title: "Layouts/AdminBreadcrumb",
  component: AdminBreadcrumb,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof AdminBreadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Pathname-derived breadcrumb with custom route labels. */
export const FromPathname: Story = {
  args: {
    pathname: "/admin/system/users/permissions",
    routeLabels: {
      admin: "Admin",
      system: "System",
      users: "Users",
      permissions: "Permissions",
    },
    homeLabel: "Home",
    homeHref: "/",
  },
};

/** Explicit custom items. */
export const CustomItems: Story = {
  args: {
    items: [
      { label: "Dashboard", href: "/" },
      { label: "Orders", href: "/orders" },
      { label: "Order #A2B3" },
    ],
  },
};

/** Short single-level path. */
export const SingleLevel: Story = {
  args: {
    pathname: "/admin",
    routeLabels: { admin: "Admin" },
  },
};

/** Custom separator (chevron). */
export const CustomSeparator: Story = {
  args: {
    items: [
      { label: "Projects", href: "/projects" },
      { label: "Chaos UI", href: "/projects/chaos-ui" },
      { label: "Settings" },
    ],
    separator: "/",
  },
};
