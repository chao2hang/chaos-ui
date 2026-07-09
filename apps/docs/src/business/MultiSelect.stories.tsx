import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { MultiSelect } from "@chaos_team/chaos-ui/business";

const options = [
  { value: "bug", label: "Bug", group: "类型" },
  { value: "feature", label: "功能", group: "类型" },
  { value: "docs", label: "文档", group: "类型" },
  { value: "high", label: "高", group: "优先级" },
  { value: "medium", label: "中", group: "优先级" },
  { value: "low", label: "低", group: "优先级" },
  { value: "frontend", label: "前端", group: "模块" },
  { value: "backend", label: "后端", group: "模块" },
];

const meta: Meta<typeof MultiSelect> = {
  title: "Business/MultiSelect",
  component: MultiSelect,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <MultiSelect
        {...args}
        options={options}
        value={value}
        onChange={setValue}
      />
    );
  },
  args: {
    placeholder: "选择标签...",
  },
};

export const WithSelection: Story = {
  render: (args) => {
    const [value, setValue] = useState<string[]>(["bug", "high", "frontend"]);
    return (
      <MultiSelect
        {...args}
        options={options}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const MaxSelected: Story = {
  render: (args) => {
    const [value, setValue] = useState<string[]>(["bug", "feature"]);
    return (
      <MultiSelect
        {...args}
        options={options}
        value={value}
        onChange={setValue}
        maxSelected={3}
        placeholder="最多选 3 个"
      />
    );
  },
};

export const Dark: Story = {
  render: (args) => {
    const [value, setValue] = useState<string[]>(["bug", "high"]);
    return (
      <MultiSelect
        {...args}
        options={options}
        value={value}
        onChange={setValue}
      />
    );
  },
  parameters: { backgrounds: { default: "dark" } },
};
