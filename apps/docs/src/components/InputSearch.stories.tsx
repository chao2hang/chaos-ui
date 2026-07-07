import type { Meta, StoryObj } from "@storybook/react";
import { InputSearch } from "@/components/ui/input-search";

const meta = {
  title: "Components/InputSearch",
  component: InputSearch,
  tags: ["autodocs"],
} satisfies Meta<typeof InputSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "Search..." },
};

export const WithLoading: Story = {
  args: { placeholder: "Searching...", loading: true },
};

export const Disabled: Story = {
  args: { placeholder: "Disabled", disabled: true },
};
