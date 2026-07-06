import type { Meta, StoryObj } from "@storybook/react";
import { BarList } from "@/components/business/bar-list";

const meta = {
  title: "Business/DataDisplay/BarList",
  component: BarList,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { data: [] },
} satisfies Meta<typeof BarList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [
      { label: "Product A", value: 450, color: "#2563eb" },
      { label: "Product B", value: 320, color: "#16a34a" },
      { label: "Product C", value: 280, color: "#ca8a04" },
      { label: "Product D", value: 150, color: "#dc2626" },
    ],
  },
};

export const Single: Story = {
  args: {
    data: [{ label: "Revenue", value: 1200, color: "#7c3aed" }],
  },
};
