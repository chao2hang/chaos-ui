import type { Meta, StoryObj } from "@storybook/react";
import { MobileFormWizard } from "@/components/business/mobile-form-wizard";

const meta: Meta<typeof MobileFormWizard> = {
  title: "Business/MobileFormWizard",
  component: MobileFormWizard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
