import type { Meta, StoryObj } from "@storybook/react";
import { StatusBadge } from "@/components/business/status-badge";

const meta: Meta<typeof StatusBadge> = {
  title: "Business/StatusBadge",
  component: StatusBadge,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
