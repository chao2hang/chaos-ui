import type { Meta, StoryObj } from "@storybook/react";
import { SequenceInput } from "@/components/ui/sequence-input";

const meta = {
  title: "Components/SequenceInput",
  component: SequenceInput,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof SequenceInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = (value: string) => {
  void value;
};

export const Default: Story = {
  args: { onChange: noop },
};

export const WithPrefix: Story = {
  args: { prefix: "ORD-", onChange: noop },
};

export const WithSuffix: Story = {
  args: { suffix: "-2026", onChange: noop },
};

export const PrefixAndSuffix: Story = {
  args: { prefix: "INV-", suffix: "-A", zeroFill: 4, onChange: noop },
};

export const ZeroFilled: Story = {
  args: { prefix: "SO-", zeroFill: 6, defaultValue: "42", onChange: noop },
};
