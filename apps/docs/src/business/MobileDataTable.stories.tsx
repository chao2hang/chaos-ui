import type { Meta, StoryObj } from "@storybook/react";
import { MobileDataTable } from "@/components/business/mobile-data-table";

const meta = {
  title: "Business/MobileDataTable",
  component: MobileDataTable,
  tags: ["autodocs"],
} satisfies Meta<typeof MobileDataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
