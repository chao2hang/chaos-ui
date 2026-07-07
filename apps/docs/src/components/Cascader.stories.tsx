import type { Meta, StoryObj } from "@storybook/react";
import { Cascader } from "@/components/ui/cascader";

const meta = {
  title: "Components/Cascader",
  component: Cascader,
  tags: ["autodocs"],
} satisfies Meta<typeof Cascader>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      { value: "hangzhou", label: "Hangzhou" },
      { value: "ningbo", label: "Ningbo" },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      { value: "nanjing", label: "Nanjing" },
      { value: "suzhou", label: "Suzhou" },
    ],
  },
];

export const Default: Story = {
  args: { options, placeholder: "Select region" },
};

export const Disabled: Story = {
  args: { options, placeholder: "Disabled", disabled: true },
};
