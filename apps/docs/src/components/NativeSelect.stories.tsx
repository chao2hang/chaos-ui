import type { Meta, StoryObj } from "@storybook/react";
import { NativeSelect } from "@/components/ui/native-select";

const meta: Meta<typeof NativeSelect> = {
  title: "Components/NativeSelect",
  component: NativeSelect,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
