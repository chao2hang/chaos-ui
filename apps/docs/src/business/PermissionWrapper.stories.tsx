import type { Meta, StoryObj } from "@storybook/react";
import { PermissionWrapper } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof PermissionWrapper> = {
  title: "Business/PermissionWrapper",
  component: PermissionWrapper,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
