import type { Meta, StoryObj } from "@storybook/react";
import { BillFooter } from "@/components/business/bill-footer";

const meta: Meta<typeof BillFooter> = {
  title: "Business/BillFooter",
  component: BillFooter,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
