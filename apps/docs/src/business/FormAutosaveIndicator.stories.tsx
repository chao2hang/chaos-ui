import type { Meta, StoryObj } from "@storybook/react";
import { FormAutosaveIndicator } from "@/components/business/form/form-autosave-indicator";

const meta: Meta<typeof FormAutosaveIndicator> = {
  title: "Business/FormAutosaveIndicator",
  component: FormAutosaveIndicator,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
