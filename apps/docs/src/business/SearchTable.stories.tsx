import type { Meta, StoryObj } from "@storybook/react";
import { SearchTable } from "@/components/business/search-table";

const meta: Meta<typeof SearchTable> = {
  title: "Business/SearchTable",
  component: SearchTable,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
