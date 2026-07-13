import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CompanyPicker } from "@/components/business/company-picker";

const demoOptions = [
  { value: "c1", label: "示例科技" },
  { value: "c2", label: "示例贸易" },
];

const meta = {
  title: "Business/CompanyPicker",
  component: CompanyPicker,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    options: demoOptions,
    placeholder: "请选择",
  },
} satisfies Meta<typeof CompanyPicker>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(demoOptions[0]!.value);
    return (
      <div className="max-w-sm space-y-2">
        <p className="text-sm font-semibold">CompanyPicker</p>
        <CompanyPicker
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
