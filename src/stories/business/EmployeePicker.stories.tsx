import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { EmployeePicker } from "@/components/business/employee-picker";

const demoOptions = [
  { value: "e1", label: "王小明" },
  { value: "e2", label: "李小红" },
];

const meta = {
  title: "Business/EmployeePicker",
  component: EmployeePicker,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    options: demoOptions,
    placeholder: "请选择",
  },
} satisfies Meta<typeof EmployeePicker>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(demoOptions[0]!.value);
    return (
      <div className="max-w-sm space-y-2">
        <p className="text-sm font-semibold">EmployeePicker</p>
        <EmployeePicker
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
