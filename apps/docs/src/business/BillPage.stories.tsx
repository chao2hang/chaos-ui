import type { Meta, StoryObj } from "@storybook/react";
import { BillPage } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof BillPage> = {
  title: "Business/BillPage",
  component: BillPage,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
