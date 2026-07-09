import type { Meta, StoryObj } from "@storybook/react";
import { MapChart } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof MapChart> = {
  title: "Business/MapChart",
  component: MapChart,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
