import type { Meta, StoryObj } from "@storybook/react";
import { FormulaEditor } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof FormulaEditor> = {
  title: "Business/FormulaEditor",
  component: FormulaEditor,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
