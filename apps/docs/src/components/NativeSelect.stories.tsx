import type { Meta, StoryObj } from "@storybook/react";
import { NativeSelect } from "@chaos_team/chaos-ui/ui";

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
