import type { Meta, StoryObj } from "@storybook/react";
import { InputNumberWithUnit } from "@/components/ui/input-number-with-unit";

const meta = {
  title: "Components/InputNumberWithUnit",
  component: InputNumberWithUnit,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    unit: "元",
    placeholder: "请输入金额",
  },
} satisfies Meta<typeof InputNumberWithUnit>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    unit: "元",
    defaultValue: 100,
    min: 0,
    max: 99999,
  },
};

export const PrefixUnit: Story = {
  args: {
    unit: "$",
    unitPosition: "prefix",
    defaultValue: 50,
    min: 0,
  },
};

export const Quantity: Story = {
  args: {
    unit: "件",
    defaultValue: 10,
    min: 0,
    step: 1,
    precision: 0,
  },
};

export const Weight: Story = {
  args: {
    unit: "kg",
    defaultValue: 25.5,
    min: 0,
    step: 0.5,
    precision: 2,
  },
};

export const Percentage: Story = {
  args: {
    unit: "%",
    unitPosition: "suffix",
    defaultValue: 85,
    min: 0,
    max: 100,
    step: 1,
  },
};

export const Disabled: Story = {
  args: {
    unit: "元",
    value: 999,
    disabled: true,
  },
};

export const WithControls: Story = {
  args: {
    unit: "件",
    defaultValue: 5,
    min: 0,
    max: 100,
    step: 1,
    controls: true,
  },
};

export const Small: Story = {
  args: {
    unit: "元",
    defaultValue: 50,
    size: "sm",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-4">
      <InputNumberWithUnit
        unit="元"
        placeholder="金额（后缀单位）"
        defaultValue={100}
        min={0}
      />
      <InputNumberWithUnit
        unit="$"
        unitPosition="prefix"
        placeholder="金额（前缀单位）"
        defaultValue={50}
        min={0}
      />
      <InputNumberWithUnit
        unit="件"
        placeholder="数量"
        defaultValue={10}
        min={0}
        step={1}
        precision={0}
      />
      <InputNumberWithUnit
        unit="kg"
        placeholder="重量"
        defaultValue={25.5}
        min={0}
        step={0.5}
        precision={2}
      />
    </div>
  ),
};
