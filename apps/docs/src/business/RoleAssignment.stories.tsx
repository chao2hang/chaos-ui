import type { Meta, StoryObj } from "@storybook/react";
import { RoleAssignment } from "@/components/business/role-assignment";

const meta: Meta<typeof RoleAssignment> = {
  title: "Business/RoleAssignment",
  component: RoleAssignment,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
