import type { Meta, StoryObj } from "@storybook/react";
import { ReconciliationSummary } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof ReconciliationSummary> = {
  title: "Business/ReconciliationSummary",
  component: ReconciliationSummary,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
