import type { Meta, StoryObj } from "@storybook/react";
import { InputSearch } from "@/components/ui/input-search";

const meta = {
  title: "Components/InputSearch",
  component: InputSearch,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof InputSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = (value: string) => {
  void value;
};

export const Default: Story = {
  args: { placeholder: "Search…", onSearch: noop, onChange: noop },
};

export const WithButton: Story = {
  args: {
    placeholder: "Search products",
    enterButton: true,
    onSearch: noop,
    onChange: noop,
  },
};

export const CustomButtonLabel: Story = {
  args: {
    placeholder: "Type a keyword",
    enterButton: "Go",
    onSearch: noop,
    onChange: noop,
  },
};

export const AllowClear: Story = {
  args: {
    placeholder: "Clearable input",
    allowClear: true,
    defaultValue: "chaos ui",
    onSearch: noop,
    onChange: noop,
  },
};

export const Loading: Story = {
  args: {
    placeholder: "Searching…",
    enterButton: true,
    loading: true,
    onSearch: noop,
    onChange: noop,
  },
};

export const Large: Story = {
  args: {
    placeholder: "Search",
    size: "lg",
    enterButton: true,
    onSearch: noop,
    onChange: noop,
  },
};
