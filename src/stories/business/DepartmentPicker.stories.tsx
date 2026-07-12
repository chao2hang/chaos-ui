import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DepartmentPicker } from "@/components/business/department-picker";

const demoOptions = [
  { value: "d1", label: "研发部" },
  { value: "d2", label: "销售部", parent: "d1" },
];

const meta = {
  title: "Business/DepartmentPicker",
  component: DepartmentPicker,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    options: demoOptions,
    placeholder: "请选择",
  },
} satisfies Meta<typeof DepartmentPicker>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(demoOptions[0]!.value);
    return (
      <div className="max-w-sm space-y-2">
        <p className="text-sm font-semibold">DepartmentPicker</p>
        <DepartmentPicker
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
