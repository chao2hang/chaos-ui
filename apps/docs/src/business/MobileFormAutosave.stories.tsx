import type { Meta, StoryObj } from "@storybook/react";
import { MobileFormAutosave } from "@/components/business/mobile-form-autosave";

const meta: Meta<typeof MobileFormAutosave> = {
  title: "Business/MobileFormAutosave",
  component: MobileFormAutosave,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
