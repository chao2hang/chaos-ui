import type { Meta, StoryObj } from "@storybook/react";
import { MobileTextarea } from "@/components/mobile/mobile-textarea";

const meta = {
  title: "Mobile/MobileTextarea",
  component: MobileTextarea,
  tags: ["autodocs"],
} satisfies Meta<typeof MobileTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
    rows: 4,
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: "This is some sample text in the mobile textarea.",
    rows: 4,
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: "Disabled textarea content",
    disabled: true,
    rows: 4,
  },
};
