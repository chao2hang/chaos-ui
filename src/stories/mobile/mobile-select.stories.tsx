import type { Meta, StoryObj } from "@storybook/react";
import { MobileSelect } from "@/components/mobile/mobile-select";

const demoOptions = [
  { value: "option-1", label: "Option 1" },
  { value: "option-2", label: "Option 2" },
  { value: "option-3", label: "Option 3" },
  { value: "option-4", label: "Option 4" },
  { value: "option-5", label: "Option 5" },
];

const meta = {
  title: "Mobile/MobileSelect",
  component: MobileSelect,
  tags: ["autodocs"],
} satisfies Meta<typeof MobileSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: demoOptions,
    placeholder: "Select an option",
  },
};

export const WithValue: Story = {
  args: {
    options: demoOptions,
    value: "option-3",
    placeholder: "Select an option",
  },
};

export const Disabled: Story = {
  args: {
    options: demoOptions,
    value: "option-1",
    disabled: true,
  },
};
