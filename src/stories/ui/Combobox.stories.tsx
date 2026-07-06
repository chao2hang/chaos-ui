import type { Meta, StoryObj } from "@storybook/react";
import { Combobox } from "@/components/ui/combobox";
import type { ComboboxOption } from "@/components/ui/combobox";

const meta = {
  title: "Components/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = (v: string | undefined) => {
  void v;
};

const frameworkOptions: ComboboxOption[] = [
  { value: "react", label: "React", description: "A library for building UIs" },
  { value: "vue", label: "Vue", description: "The progressive framework" },
  {
    value: "svelte",
    label: "Svelte",
    description: "Cybernetically enhanced web apps",
  },
  {
    value: "solid",
    label: "Solid",
    description: "Fine-grained reactivity",
    disabled: true,
  },
];

const groupedOptions: ComboboxOption[] = [
  { value: "alpha", label: "Alpha", group: "Greek" },
  { value: "beta", label: "Beta", group: "Greek" },
  { value: "one", label: "One", group: "Numbers" },
  { value: "two", label: "Two", group: "Numbers" },
];

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Default searchable combobox. */
export const Default: Story = {
  args: {
    options: frameworkOptions,
    placeholder: "Select a framework",
    onChange: noop,
  },
};

/** Clearable — shows a clear button when a value is selected. */
export const Clearable: Story = {
  args: {
    options: frameworkOptions,
    value: "react",
    clearable: true,
    onChange: noop,
  },
};

/** Includes a disabled option (Solid). */
export const WithDisabledOption: Story = {
  args: {
    options: frameworkOptions,
    placeholder: "Pick a framework",
    onChange: noop,
  },
};

/** Grouped options — Greek letters and Numbers. */
export const Grouped: Story = {
  args: {
    options: groupedOptions,
    placeholder: "Pick an item",
    onChange: noop,
  },
};

/** Non-searchable (dropdown-only) combobox. */
export const NonSearchable: Story = {
  args: {
    options: frameworkOptions,
    searchable: false,
    placeholder: "Select (not searchable)",
    onChange: noop,
  },
};

/** Disabled state. */
export const Disabled: Story = {
  args: {
    options: frameworkOptions,
    value: "vue",
    disabled: true,
  },
};
