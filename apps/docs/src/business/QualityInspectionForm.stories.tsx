import type { Meta, StoryObj } from "@storybook/react";
import { QualityInspectionForm } from "@/components/business/quality-inspection-form";

const meta = {
  title: "Business/QualityInspectionForm",
  component: QualityInspectionForm,
  tags: ["autodocs"],
} satisfies Meta<typeof QualityInspectionForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
