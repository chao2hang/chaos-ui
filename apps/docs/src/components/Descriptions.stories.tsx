import type { Meta, StoryObj } from "@storybook/react";
import { Descriptions } from "@/components/ui/descriptions";

const meta = {
  title: "Components/Descriptions",
  component: Descriptions,
  tags: ["autodocs"],
} satisfies Meta<typeof Descriptions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: "Name", value: "John Doe" },
      { label: "Email", value: "john@example.com" },
      { label: "Role", value: "Admin" },
    ],
  },
};

export const Bordered: Story = {
  args: {
    bordered: true,
    items: [
      { label: "Product", value: "Chaos UI" },
      { label: "Version", value: "1.0.0" },
      { label: "License", value: "MIT" },
    ],
  },
};
