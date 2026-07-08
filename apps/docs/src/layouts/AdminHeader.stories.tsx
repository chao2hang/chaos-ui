import type { Meta, StoryObj } from "@storybook/react";
import { AdminHeader } from "@/components/layout/admin-header";

const meta: Meta<typeof AdminHeader> = {
  title: "Layouts/AdminHeader",
  component: AdminHeader,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
