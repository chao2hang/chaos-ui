import type { Meta, StoryObj } from "@storybook/react";
import { StatCardWithDelta } from "@/components/business/stat-card-with-delta";
import { DollarSignIcon } from "@/components/ui/icons";

const meta = {
  title: "Business/DataDisplay/StatCardWithDelta",
  component: StatCardWithDelta,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof StatCardWithDelta>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Revenue",
    value: "$45,231",
    delta: 12.5,
    icon: DollarSignIcon,
  },
};

export const Negative: Story = {
  args: {
    label: "Churn",
    value: "3.2%",
    delta: -1.8,
  },
};

export const NoDelta: Story = {
  args: {
    label: "Total users",
    value: "12,840",
  },
};
