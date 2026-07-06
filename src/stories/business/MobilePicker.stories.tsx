import type { Meta, StoryObj } from "@storybook/react";
import { MobilePicker } from "@/components/business/mobile-picker";

const meta = {
  title: "Business/Mobile/MobilePicker",
  component: MobilePicker,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    options: [],
  },
} satisfies Meta<typeof MobilePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const sizeOptions = [
  { label: "Extra small", value: "xs" },
  { label: "Small", value: "sm" },
  { label: "Medium", value: "md" },
  { label: "Large", value: "lg" },
  { label: "Extra large", value: "xl" },
];

const noop = (val: string) => {
  void val;
};

export const Default: Story = {
  args: {
    options: sizeOptions,
    onChange: noop,
  },
};

export const WithValue: Story = {
  args: {
    options: sizeOptions,
    value: "md",
    onChange: noop,
  },
};

export const ColorOptions: Story = {
  args: {
    options: [
      { label: "Red", value: "red" },
      { label: "Orange", value: "orange" },
      { label: "Yellow", value: "yellow" },
      { label: "Green", value: "green" },
      { label: "Blue", value: "blue" },
      { label: "Indigo", value: "indigo" },
      { label: "Violet", value: "violet" },
    ],
    onChange: noop,
  },
};
