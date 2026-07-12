import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SkuPicker } from "@/components/business/sku-picker";

const demoOptions = [
  { value: "SKU1", label: "酱油 500ml", spec: "500ml", price: 12.5 },
  { value: "SKU2", label: "醋 500ml", spec: "500ml", price: 8 },
];

const meta = {
  title: "Business/SkuPicker",
  component: SkuPicker,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    options: demoOptions,
    placeholder: "请选择",
  },
} satisfies Meta<typeof SkuPicker>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(demoOptions[0]!.value);
    return (
      <div className="max-w-sm space-y-2">
        <p className="text-sm font-semibold">SkuPicker</p>
        <SkuPicker
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
