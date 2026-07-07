import type { Meta, StoryObj } from "@storybook/react";
import { PermissionWrapper } from "@/components/business/permission-wrapper";

const meta = {
  title: "Business/PermissionWrapper",
  component: PermissionWrapper,
  tags: ["autodocs"],
} satisfies Meta<typeof PermissionWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
