import type { Meta, StoryObj } from "@storybook/react";
import { QualityInspectionForm } from "@/components/business/quality-inspection-form";

const meta: Meta<typeof QualityInspectionForm> = {
  title: "Business/QualityInspectionForm",
  component: QualityInspectionForm,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
