import type { Meta, StoryObj } from "@storybook/react";
import { SearchTable } from "@/components/business/search-table";

const meta = {
  title: "Business/SearchTable",
  component: SearchTable,
  tags: ["autodocs"],
} satisfies Meta<typeof SearchTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
