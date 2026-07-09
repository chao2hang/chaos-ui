import type { Meta, StoryObj } from "@storybook/react";
import { CostCenterPicker } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof CostCenterPicker> = {
  title: "Business/CostCenterPicker",
  component: CostCenterPicker,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
