import type { Meta, StoryObj } from "@storybook/react";
import { MobileFormField } from "@/components/mobile/mobile-form-field";
import { Input } from "@/components/ui/input";

const meta = {
  title: "Mobile/MobileFormField",
  component: MobileFormField,
  tags: ["autodocs"],
} satisfies Meta<typeof MobileFormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Username",
    children: <Input placeholder="Enter username" />,
  },
};

export const WithDescription: Story = {
  args: {
    label: "Email",
    description: "We'll never share your email",
    children: <Input placeholder="Enter email" type="email" />,
  },
};

export const Required: Story = {
  args: {
    label: "Phone Number",
    required: true,
    children: <Input placeholder="Enter phone number" type="tel" />,
  },
};

export const WithError: Story = {
  args: {
    label: "Password",
    error: "Password must be at least 8 characters",
    children: <Input placeholder="Enter password" type="password" />,
  },
};
