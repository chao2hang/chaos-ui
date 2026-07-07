import type { Meta, StoryObj } from "@storybook/react";
import { FormulaEditor } from "@/components/business/formula-editor";

const meta = {
  title: "Business/FormulaEditor",
  component: FormulaEditor,
  tags: ["autodocs"],
} satisfies Meta<typeof FormulaEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
