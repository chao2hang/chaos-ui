import type { Meta, StoryObj } from "@storybook/react";
import { AdminBreadcrumb } from "@/components/layout/admin-breadcrumb";

const meta: Meta<typeof AdminBreadcrumb> = {
  title: "Layouts/AdminBreadcrumb",
  component: AdminBreadcrumb,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
