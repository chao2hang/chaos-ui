import type { Meta, StoryObj } from "@storybook/react";
import { BillFooter } from "@/components/business/bill-footer";

const meta = {
  title: "Business/BillFooter",
  component: BillFooter,
  tags: ["autodocs"],
} satisfies Meta<typeof BillFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
