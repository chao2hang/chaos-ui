import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "@/components/ui/date-picker";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "Select date" },
};

export const WithValue: Story = {
  args: { defaultValue: new Date() },
};

export const Disabled: Story = {
  args: { placeholder: "Disabled", disabled: true },
};
