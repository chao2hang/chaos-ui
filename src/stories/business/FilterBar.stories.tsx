import type { Meta, StoryObj } from "@storybook/react";
import { FilterBar } from "@/components/business/filter-bar";

const noopSearch = (values: Record<string, unknown>) => { void values; };

const meta = {
  title: "Business/Nav/FilterBar",
  component: FilterBar,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { fields: [], onSearch: noopSearch },
} satisfies Meta<typeof FilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fields: [
      { key: "status", label: "Status", type: "select", options: [{ value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }] },
      { key: "keyword", label: "Search", type: "input" },
      { key: "date", label: "Date", type: "date-picker" },
    ],
  },
};

export const Loading: Story = {
  args: {
    fields: [
      { key: "status", label: "Status", type: "select", options: [] },
    ],
    loading: true,
  },
};

export const WithReset: Story = {
  args: {
    fields: [
      { key: "category", label: "Category", type: "input" },
    ],
    onReset: () => {},
  },
};
