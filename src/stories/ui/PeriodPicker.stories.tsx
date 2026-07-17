import type { Meta, StoryObj } from "@storybook/react";
import { PeriodPicker } from "@/components/ui/period-picker";

const meta = {
  title: "UI/PeriodPicker",
  component: PeriodPicker,
  tags: ["autodocs"],
} satisfies Meta<typeof PeriodPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    granularity: "month",
  },
};
