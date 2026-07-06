import type { Meta, StoryObj } from "@storybook/react";
import { BudgetPacingCard } from "@/components/business/budget-pacing-card";
import type { BudgetPacingStatus } from "@/components/business/budget-pacing-card";

const examples: Array<{
  status: BudgetPacingStatus;
  spent: number;
  forecast: number;
}> = [
  { status: "under", spent: 7800, forecast: 24800 },
  { status: "on-track", spent: 22800, forecast: 39800 },
  { status: "over", spent: 36800, forecast: 51200 },
  { status: "exhausted", spent: 43000, forecast: 43000 },
];

const meta = {
  title: "Business/BudgetPacingCard",
  component: BudgetPacingCard,
  tags: ["autodocs", "a11y"],
  args: {
    budget: 42000,
    spent: 22800,
    forecast: 39800,
  },
} satisfies Meta<typeof BudgetPacingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="grid gap-4 lg:grid-cols-2">
      {examples.map((example) => (
        <BudgetPacingCard
          key={example.status}
          title={`${example.status} pacing`}
          budget={42000}
          spent={example.spent}
          forecast={example.forecast}
          status={example.status}
        />
      ))}
    </div>
  ),
};
