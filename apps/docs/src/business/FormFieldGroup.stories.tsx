import type { Meta, StoryObj } from "@storybook/react";
import { FormFieldGroup } from "@/components/business/form/form-field-group";

const meta = {
  title: "Business/FormFieldGroup",
  component: FormFieldGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof FormFieldGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
