import type { Meta, StoryObj } from "@storybook/react";
import { AdminBreadcrumb } from "@/components/layout/admin-breadcrumb";

const meta: Meta<typeof AdminBreadcrumb> = {
  title: "Layouts/AdminBreadcrumb",
  component: AdminBreadcrumb,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: "Dashboard", href: "/" },
      { label: "Orders", href: "/orders" },
      { label: "Order #A2B3" },
    ],
  },
};

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

export const SingleLevel: Story = {
  args: {
    items: [{ label: "Dashboard", href: "/" }],
  },
};
