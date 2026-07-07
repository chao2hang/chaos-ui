import type { Meta, StoryObj } from "@storybook/react";
import { BillPage } from "@/components/business/bill-page";

const meta = {
  title: "Business/BillPage",
  component: BillPage,
  tags: ["autodocs"],
} satisfies Meta<typeof BillPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
