import type { Meta, StoryObj } from "@storybook/react";
import { DonutCard } from "@/components/business/donut-card";

const meta = {
  title: "Business/DataDisplay/DonutCard",
  component: DonutCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { data: [] },
} satisfies Meta<typeof DonutCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [
      { label: "Marketing", value: 35, color: "#2563eb" },
      { label: "R&D", value: 30, color: "#16a34a" },
      { label: "Operations", value: 20, color: "#ca8a04" },
      { label: "Sales", value: 15, color: "#dc2626" },
    ],
    centerLabel: "Budget",
  },
};
