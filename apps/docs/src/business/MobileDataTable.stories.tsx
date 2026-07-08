import type { Meta, StoryObj } from "@storybook/react";
import { MobileDataTable } from "@/components/business/mobile-data-table";

const meta: Meta<typeof MobileDataTable> = {
  title: "Business/MobileDataTable",
  component: MobileDataTable,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
