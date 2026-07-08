import type { Meta, StoryObj } from "@storybook/react";
import { AdminSider } from "@/components/layout/admin-sider";

const meta: Meta<typeof AdminSider> = {
  title: "Layouts/AdminSider",
  component: AdminSider,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
