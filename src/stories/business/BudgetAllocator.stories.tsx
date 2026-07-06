import type { Meta, StoryObj } from "@storybook/react";
import { BudgetAllocator } from "@/components/business/budget-allocator";

const categories = [
  { id: "1", name: "Marketing", amount: 15000, cap: 20000 },
  { id: "2", name: "R&D", amount: 30000, cap: 40000 },
  { id: "3", name: "Operations", amount: 10000, cap: 15000 },
];

const meta = {
  title: "Business/Finance/BudgetAllocator",
  component: BudgetAllocator,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof BudgetAllocator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { total: 100000, categories },
};

export const WithChangeCallback: Story = {
  args: {
    total: 50000,
    categories,
    onChange: (cats) => { void cats; },
  },
};
