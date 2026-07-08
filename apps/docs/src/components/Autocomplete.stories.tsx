import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Autocomplete } from "@/components/ui/autocomplete";

const meta: Meta<typeof Autocomplete> = {
  title: "Components/Autocomplete",
  component: Autocomplete,
  tags: ["autodocs"],
  args: {
    placeholder: "Type to search...",
    disabled: false,
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date" },
];

export const Default: Story = {
  args: {
    options: fruits,
    placeholder: "Search fruits...",
  },
};

export const WithSearch: Story = {
  render: (args) => {
    const [options, setOptions] = React.useState<typeof fruits>([]);
    return (
      <Autocomplete
        {...args}
        options={options}
        onSearch={(val: string) =>
          setOptions(
            val
              ? fruits.filter((f) =>
                  f.label.toLowerCase().includes(val.toLowerCase()),
                )
              : [],
          )
        }
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    options: fruits,
    disabled: true,
  },
};
