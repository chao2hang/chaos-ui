import type { Meta, StoryObj } from "@storybook/react";
import { RoleAssignment } from "@/components/business/role-assignment";

const meta = {
  title: "Business/RoleAssignment",
  component: RoleAssignment,
  tags: ["autodocs"],
} satisfies Meta<typeof RoleAssignment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
