import type { Meta, StoryObj } from "@storybook/react";
import { Combobox } from "@/components/business/combobox";

const options = [
  { value: "react", label: "React", group: "前端框架" },
  { value: "vue", label: "Vue", group: "前端框架" },
  { value: "angular", label: "Angular", group: "前端框架" },
  { value: "svelte", label: "Svelte", group: "前端框架" },
  { value: "nextjs", label: "Next.js", group: "全栈框架" },
  { value: "nuxt", label: "Nuxt", group: "全栈框架" },
  { value: "express", label: "Express", group: "后端框架", disabled: true },
  { value: "fastapi", label: "FastAPI", group: "后端框架" },
];

const meta: Meta<typeof Combobox> = {
  title: "Business/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options,
    placeholder: "选择框架...",
  },
};

export const WithValue: Story = {
  args: {
    options,
    value: "react",
  },
};

export const Grouped: Story = {
  args: {
    options,
    placeholder: "带分组的选择框",
  },
};

export const Dark: Story = {
  args: {
    options,
    value: "vue",
    placeholder: "暗色主题",
  },
  parameters: { backgrounds: { default: "dark" } },
};
