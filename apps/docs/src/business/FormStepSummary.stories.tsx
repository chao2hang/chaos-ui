import type { Meta, StoryObj } from "@storybook/react";
import { FormStepSummary } from "@/components/business/form/form-step-summary";

const meta = {
  title: "Business/FormStepSummary",
  component: FormStepSummary,
  tags: ["autodocs"],
} satisfies Meta<typeof FormStepSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
