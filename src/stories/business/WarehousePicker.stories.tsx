import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { WarehousePicker } from "@/components/business/warehouse-picker";

const demoOptions = [
  { value: "w1", label: "华东仓" },
  { value: "w2", label: "华南仓" },
];

const meta = {
  title: "Business/WarehousePicker",
  component: WarehousePicker,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    options: demoOptions,
    placeholder: "请选择",
  },
} satisfies Meta<typeof WarehousePicker>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(demoOptions[0]!.value);
    return (
      <div className="max-w-sm space-y-2">
        <p className="text-sm font-semibold">WarehousePicker</p>
        <WarehousePicker
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
