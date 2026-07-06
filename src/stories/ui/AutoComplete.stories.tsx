import type { Meta, StoryObj } from "@storybook/react";
import { AutoComplete } from "@/components/ui/autocomplete";
import type { AutoCompleteOption } from "@/components/ui/autocomplete";

const meta = {
  title: "Components/AutoComplete",
  component: AutoComplete,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof AutoComplete>;

export default meta;
type Story = StoryObj<typeof meta>;

const noopString = (v: string) => {
  void v;
};

const fruitOptions: AutoCompleteOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "durian", label: "Durian" },
  { value: "elderberry", label: "Elderberry" },
];

const mixedOptions: AutoCompleteOption[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte", disabled: true },
  { value: "solid", label: "Solid" },
];

/* -------------------------------------------------------------------------- */
/*  Stories                                                                   */
/* -------------------------------------------------------------------------- */

/** Default autocomplete with fruit options. */
export const Default: Story = {
  args: {
    options: fruitOptions,
    placeholder: "Type a fruit…",
    onChange: noopString,
    onSelect: noopString,
  },
};

/** Pre-filled value. */
export const WithValue: Story = {
  args: {
    options: fruitOptions,
    value: "banana",
    onChange: noopString,
    onSelect: noopString,
  },
};

/** Includes a disabled option (Svelte). */
export const WithDisabledOption: Story = {
  args: {
    options: mixedOptions,
    placeholder: "Pick a framework",
    onChange: noopString,
    onSelect: noopString,
  },
};

/** Disabled state. */
export const Disabled: Story = {
  args: {
    options: fruitOptions,
    value: "apple",
    disabled: true,
  },
};
