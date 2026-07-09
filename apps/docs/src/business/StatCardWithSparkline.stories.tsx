import type { Meta, StoryObj } from "@storybook/react";
import { StatCardWithSparkline } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof StatCardWithSparkline> = {
  title: "Business/StatCardWithSparkline",
  component: StatCardWithSparkline,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
