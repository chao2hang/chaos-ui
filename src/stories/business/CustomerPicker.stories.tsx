import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CustomerPicker } from "@/components/business/customer-picker";

const demoOptions = [
  { value: "cu1", label: "张三商贸" },
  { value: "cu2", label: "李四科技" },
];

const meta = {
  title: "Business/CustomerPicker",
  component: CustomerPicker,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    options: demoOptions,
    placeholder: "请选择",
  },
} satisfies Meta<typeof CustomerPicker>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(demoOptions[0]!.value);
    return (
      <div className="max-w-sm space-y-2">
        <p className="text-sm font-semibold">CustomerPicker</p>
        <CustomerPicker
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
