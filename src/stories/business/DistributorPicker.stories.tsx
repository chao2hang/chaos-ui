import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DistributorPicker } from "@/components/business/distributor-picker";

const demoOptions = [
  { value: "di1", label: "华东经销商" },
  { value: "di2", label: "华南经销商" },
];

const meta = {
  title: "Business/DistributorPicker",
  component: DistributorPicker,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    options: demoOptions,
    placeholder: "请选择",
  },
} satisfies Meta<typeof DistributorPicker>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(demoOptions[0]!.value);
    return (
      <div className="max-w-sm space-y-2">
        <p className="text-sm font-semibold">DistributorPicker</p>
        <DistributorPicker
          value={value}
          onChange={(v) => setValue(v ?? "")}
          options={demoOptions}
          placeholder="请选择"
        />
        <p className="text-muted-foreground text-xs">当前：{value || "空"}</p>
      </div>
    );
  },
};
