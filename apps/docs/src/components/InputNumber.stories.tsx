import type { Meta, StoryObj } from "@storybook/react";
import { InputNumber } from "@/components/ui/input-number";

const meta: Meta<typeof InputNumber> = {
  title: "Components/InputNumber",
  component: InputNumber,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { value: 0, min: 0, max: 100 },
};

export const WithStep: Story = {
  args: { value: 10, min: 0, max: 100, step: 5 },
};

export const Disabled: Story = {
  args: { value: 42, disabled: true },
};
