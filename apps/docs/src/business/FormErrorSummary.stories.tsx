import type { Meta, StoryObj } from "@storybook/react";
import { FormErrorSummary } from "@/components/business/form/form-error-summary";

const meta: Meta<typeof FormErrorSummary> = {
  title: "Business/FormErrorSummary",
  component: FormErrorSummary,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
