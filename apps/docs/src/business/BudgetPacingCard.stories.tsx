import type { Meta, StoryObj } from "@storybook/react";
import { BudgetPacingCard } from "@/components/business/budget-pacing-card";

const meta: Meta<typeof BudgetPacingCard> = {
  title: "Business/BudgetPacingCard",
  component: BudgetPacingCard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
