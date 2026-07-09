import type { Meta, StoryObj } from "@storybook/react";
import { Captcha } from "@/components/ui/captcha";

const meta = {
  title: "Components/Captcha",
  component: Captcha,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    length: 4,
    placeholder: "请输入验证码",
  },
} satisfies Meta<typeof Captcha>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    length: 4,
  },
};

export const LongCode: Story = {
  args: {
    length: 6,
    placeholder: "请输入6位验证码",
  },
};

export const Disabled: Story = {
  args: {
    length: 4,
    disabled: true,
  },
};

export const LargeSize: Story = {
  args: {
    length: 4,
    size: "lg",
    placeholder: "请输入验证码",
  },
};

export const CustomVisual: Story = {
  args: {
    length: 4,
    visualOptions: {
      bgColor: "#e8f4fd",
      fontSize: 32,
      textColor: "rgb(30, 60, 140)",
      noiseLines: 5,
      noiseDots: 50,
    },
  },
};
