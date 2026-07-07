import type { Meta, StoryObj } from "@storybook/react";
import { FilterBar } from "@/components/business/filter-bar";

const meta = {
  title: "Business/FilterBar",
  component: FilterBar,
  tags: ["autodocs"],
} satisfies Meta<typeof FilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
