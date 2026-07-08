import type { Meta, StoryObj } from "@storybook/react";
import { StatCardRow } from "@/components/business/stat-card-row";

const meta: Meta<typeof StatCardRow> = {
  title: "Business/StatCardRow",
  component: StatCardRow,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
