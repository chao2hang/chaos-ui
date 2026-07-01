import type { Meta, StoryObj } from "@storybook/react";
import { NativeSelect } from "@/components/ui/native-select";

const meta: Meta<typeof NativeSelect> = {
  title: "Components/NativeSelect",
  component: NativeSelect,
  tags: ["autodocs", "a11y"],
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "default"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof NativeSelect>;

const countryOptions = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "cn", label: "China" },
  { value: "jp", label: "Japan" },
  { value: "de", label: "Germany" },
  { value: "disabled", label: "Disabled Option", disabled: true },
];

const groupedOptions = [
  {
    label: "Fruits",
    options: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "orange", label: "Orange" },
    ],
  },
  {
    label: "Vegetables",
    options: [
      { value: "carrot", label: "Carrot" },
      { value: "broccoli", label: "Broccoli" },
    ],
  },
];

export const Default: Story = {
  args: {
    options: countryOptions,
    placeholder: "Select a country...",
  },
};

export const Grouped: Story = {
  args: {
    options: groupedOptions,
    placeholder: "Select food...",
  },
};

export const Small: Story = {
  args: {
    options: countryOptions,
    placeholder: "Small select",
    size: "sm",
  },
};

export const Disabled: Story = {
  args: {
    options: countryOptions,
    placeholder: "Disabled",
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    options: countryOptions,
    placeholder: "Error state",
    error: true,
  },
};

export const NoPlaceholder: Story = {
  args: {
    options: countryOptions,
  },
};
