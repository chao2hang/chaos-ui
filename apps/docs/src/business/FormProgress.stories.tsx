import type { Meta, StoryObj } from "@storybook/react";
import { FormProgress } from "@/components/business/form/form-progress";

const meta: Meta<typeof FormProgress> = {
  title: "Business/FormProgress",
  component: FormProgress,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <FormProgress current={42} total={10} labels={["Q1", "Q2", "Q3", "Q4"]} />
  ),
};
