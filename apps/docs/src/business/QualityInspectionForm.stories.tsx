import type { Meta, StoryObj } from "@storybook/react";
import { QualityInspectionForm } from "@chaos_team/chaos-ui/business";

const meta: Meta<typeof QualityInspectionForm> = {
  title: "Business/QualityInspectionForm",
  component: QualityInspectionForm,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <QualityInspectionForm inspector={"示例"} onSubmit={() => {}} />
  ),
};
