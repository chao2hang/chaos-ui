import type { Meta, StoryObj } from "@storybook/react";
import { BillHeader } from "@/components/business/bill-header";

const meta = {
  title: "Business/BillHeader",
  component: BillHeader,
  tags: ["autodocs"],
} satisfies Meta<typeof BillHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
