import type { Meta, StoryObj } from "@storybook/react";
import { FormAutosaveIndicator } from "@/components/business/form/form-autosave-indicator";

const meta = {
  title: "Business/FormAutosaveIndicator",
  component: FormAutosaveIndicator,
  tags: ["autodocs"],
} satisfies Meta<typeof FormAutosaveIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
