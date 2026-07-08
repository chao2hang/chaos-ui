import type { Meta, StoryObj } from "@storybook/react";
import { BillHeader } from "@/components/business/bill-header";

const meta: Meta<typeof BillHeader> = {
  title: "Business/BillHeader",
  component: BillHeader,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
