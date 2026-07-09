import type { Meta, StoryObj } from "@storybook/react";
import { SpcControlChart } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof SpcControlChart> = {
  title: "Business/SpcControlChart",
  component: SpcControlChart,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
