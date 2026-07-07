import type { Meta, StoryObj } from "@storybook/react";
import { MobileFormAutosave } from "@/components/business/mobile-form-autosave";

const meta = {
  title: "Business/MobileFormAutosave",
  component: MobileFormAutosave,
  tags: ["autodocs"],
} satisfies Meta<typeof MobileFormAutosave>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
