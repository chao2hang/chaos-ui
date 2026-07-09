import type { Meta, StoryObj } from "@storybook/react";
import { IotSensorGrid } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof IotSensorGrid> = {
  title: "Business/IotSensorGrid",
  component: IotSensorGrid,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
