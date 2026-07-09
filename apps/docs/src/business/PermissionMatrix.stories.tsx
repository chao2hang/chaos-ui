import type { Meta, StoryObj } from "@storybook/react";
import { PermissionMatrix } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof PermissionMatrix> = {
  title: "Business/PermissionMatrix",
  component: PermissionMatrix,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
