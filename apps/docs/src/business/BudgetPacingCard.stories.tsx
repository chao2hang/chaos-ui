import type { Meta, StoryObj } from "@storybook/react";
import { BudgetPacingCard } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof BudgetPacingCard> = {
  title: "Business/BudgetPacingCard",
  component: BudgetPacingCard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <BudgetPacingCard title={"示例"} budget={10000} spent={42} forecast={42} />
  ),
};
