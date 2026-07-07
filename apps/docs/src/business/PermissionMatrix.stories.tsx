import type { Meta, StoryObj } from "@storybook/react";
import { PermissionMatrix } from "@/components/business/permission-matrix";

const meta = {
  title: "Business/PermissionMatrix",
  component: PermissionMatrix,
  tags: ["autodocs"],
} satisfies Meta<typeof PermissionMatrix>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
