import type { Meta, StoryObj } from "@storybook/react";
import { SignActionButton } from "@/components/business/sign-action-button";

const meta = {
  title: "Business/Approval/SignActionButton",
  component: SignActionButton,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof SignActionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomLabel: Story = {
  args: { label: "Sign document" },
};

export const Signed: Story = {
  args: { signed: true },
};

export const WithHandler: Story = {
  args: { onSign: () => {} },
};
