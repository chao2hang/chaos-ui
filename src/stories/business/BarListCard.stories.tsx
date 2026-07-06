import type { Meta, StoryObj } from "@storybook/react";
import { BarListCard } from "@/components/business/bar-list-card";

const meta = {
  title: "Business/DataDisplay/BarListCard",
  component: BarListCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof BarListCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Top products",
    data: [
      { label: "Widget A", value: 820, color: "#2563eb" },
      { label: "Widget B", value: 640, color: "#16a34a" },
      { label: "Widget C", value: 510, color: "#ca8a04" },
    ],
  },
};

export const NoTitle: Story = {
  args: {
    data: [
      { label: "US", value: 2500 },
      { label: "EU", value: 1800 },
      { label: "APAC", value: 1200 },
    ],
  },
};
