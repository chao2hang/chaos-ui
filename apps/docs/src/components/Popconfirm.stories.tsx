import type { Meta, StoryObj } from "@storybook/react";
import { Popconfirm } from "@/components/ui/popconfirm";

const meta: Meta<typeof Popconfirm> = {
  title: "Components/Popconfirm",
  component: Popconfirm,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
