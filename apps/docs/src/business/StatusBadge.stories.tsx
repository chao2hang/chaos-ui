import type { Meta, StoryObj } from "@storybook/react";
import { StatusBadge } from "@/components/business/status-badge";

const meta = {
  title: "Business/StatusBadge",
  component: StatusBadge,
  tags: ["autodocs"],
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
