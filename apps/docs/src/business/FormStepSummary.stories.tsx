import type { Meta, StoryObj } from "@storybook/react";
import { FormStepSummary } from "@/components/business/form/form-step-summary";

const meta: Meta<typeof FormStepSummary> = {
  title: "Business/FormStepSummary",
  component: FormStepSummary,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
