import type { Meta, StoryObj } from "@storybook/react";
import { SupplierScorecard } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof SupplierScorecard> = {
  title: "Business/SupplierScorecard",
  component: SupplierScorecard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
