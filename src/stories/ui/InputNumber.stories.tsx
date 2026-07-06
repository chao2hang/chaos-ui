import type { Meta, StoryObj } from "@storybook/react";
import { InputNumber } from "@/components/ui/input-number";

const meta = {
  title: "Components/InputNumber",
  component: InputNumber,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof InputNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = (value: number | null | undefined) => {
  void value;
};

export const Default: Story = {
  args: { defaultValue: 0, onChange: noop },
};

export const WithBounds: Story = {
  args: { defaultValue: 5, min: 0, max: 10, onChange: noop },
};

export const WithStep: Story = {
  args: { defaultValue: 1, step: 0.25, min: 0, onChange: noop },
};

export const Precision: Story = {
  args: { defaultValue: 1.5, precision: 2, step: 0.05, onChange: noop },
};

export const Large: Story = {
  args: { defaultValue: 100, size: "lg", onChange: noop },
};

export const Small: Story = {
  args: { defaultValue: 100, size: "sm", onChange: noop },
};

export const Disabled: Story = {
  args: { value: 42, disabled: true },
};

export const NoControls: Story = {
  args: { defaultValue: 8, controls: false, onChange: noop },
};

export const CurrencyFormatter: Story = {
  args: {
    defaultValue: 12500,
    min: 0,
    formatter: (value) => `$${(value ?? 0).toLocaleString()}`,
    parser: (display) => Number(display.replace(/[^0-9.-]/g, "")) || 0,
    onChange: noop,
  },
};
