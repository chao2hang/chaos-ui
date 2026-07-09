import type { Meta, StoryObj } from "@storybook/react";
import { PriceAdjustBrowse } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof PriceAdjustBrowse> = {
  title: "Business/PriceAdjustBrowse",
  component: PriceAdjustBrowse,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
