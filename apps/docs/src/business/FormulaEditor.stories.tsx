import type { Meta, StoryObj } from "@storybook/react";
import { FormulaEditor } from "@/components/business/formula-editor";

const meta: Meta<typeof FormulaEditor> = {
  title: "Business/FormulaEditor",
  component: FormulaEditor,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
