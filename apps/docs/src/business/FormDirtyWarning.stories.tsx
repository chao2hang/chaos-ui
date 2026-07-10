import type { Meta, StoryObj } from "@storybook/react";
import { FormDirtyWarning } from "@/components/business/form/form-dirty-warning";

const meta: Meta<typeof FormDirtyWarning> = {
  title: "Business/FormDirtyWarning",
  component: FormDirtyWarning,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <FormDirtyWarning
      open={false}
      onOpenChange={() => {}}
      onDiscard={() => {}}
      onSave={() => {}}
      saving={false}
    />
  ),
};
