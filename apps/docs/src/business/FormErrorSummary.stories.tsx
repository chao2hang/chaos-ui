import type { Meta, StoryObj } from "@storybook/react";
import { FormErrorSummary } from "@/components/business/form/form-error-summary";

const meta = {
  title: "Business/FormErrorSummary",
  component: FormErrorSummary,
  tags: ["autodocs"],
} satisfies Meta<typeof FormErrorSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
