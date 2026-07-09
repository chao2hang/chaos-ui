import type { Meta, StoryObj } from "@storybook/react";
import { AsyncTaskCenter } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof AsyncTaskCenter> = {
  title: "Business/AsyncTaskCenter",
  component: AsyncTaskCenter,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
