import type { Meta, StoryObj } from "@storybook/react";
import { SparkChart } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof SparkChart> = {
  title: "Business/SparkChart",
  component: SparkChart,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
