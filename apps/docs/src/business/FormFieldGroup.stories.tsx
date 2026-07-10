import type { Meta, StoryObj } from "@storybook/react";
import { FormFieldGroup } from "@/components/business/form/form-field-group";

const meta: Meta<typeof FormFieldGroup> = {
  title: "Business/FormFieldGroup",
  component: FormFieldGroup,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <FormFieldGroup
      legend={"示例"}
      description={"这是一个示例描述"}
      required={false}
      children={null}
    />
  ),
};
