import type { Meta, StoryObj } from "@storybook/react";
import { FormDirtyWarning } from "@/components/business/form/form-dirty-warning";

const meta = {
  title: "Business/FormDirtyWarning",
  component: FormDirtyWarning,
  tags: ["autodocs"],
} satisfies Meta<typeof FormDirtyWarning>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
