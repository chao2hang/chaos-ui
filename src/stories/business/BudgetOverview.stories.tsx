import type { Meta, StoryObj } from "@storybook/react";
import { BudgetOverview } from "@/components/business/budget-overview";

const budgetCategories = [
  { name: "Marketing", budget: 50000, actual: 42000 },
  { name: "R&D", budget: 80000, actual: 65000 },
  { name: "Operations", budget: 30000, actual: 28000 },
];

const meta = {
  title: "Business/Finance/BudgetOverview",
  component: BudgetOverview,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { total: 0, used: 0, remaining: 0, categories: [] },
} satisfies Meta<typeof BudgetOverview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    total: 160000,
    used: 135000,
    remaining: 25000,
    categories: budgetCategories,
  },
};

export const Overspent: Story = {
  args: {
    total: 100000,
    used: 115000,
    remaining: -15000,
    categories: [
      { name: "Marketing", budget: 50000, actual: 62000 },
      { name: "Sales", budget: 50000, actual: 53000 },
    ],
  },
};
