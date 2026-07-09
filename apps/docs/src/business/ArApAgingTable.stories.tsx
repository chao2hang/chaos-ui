import type { Meta, StoryObj } from "@storybook/react";
import { ArApAgingTable } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof ArApAgingTable> = {
  title: "Business/ArApAgingTable",
  component: ArApAgingTable,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
