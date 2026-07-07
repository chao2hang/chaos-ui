import type { Meta, StoryObj } from "@storybook/react";
import { OTPField } from "@/components/ui/otp-field";

const meta = {
  title: "Components/OTPField",
  component: OTPField,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof OTPField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SixDigit: Story = {
  args: { length: 6 },
};

export const FourDigit: Story = {
  args: { length: 4 },
};

export const WithValue: Story = {
  args: { length: 6, value: "123456" },
};
