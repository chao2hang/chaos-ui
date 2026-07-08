import type { Meta, StoryObj } from "@storybook/react";
import { Menubar } from "@/components/ui/menubar";

const meta: Meta<typeof Menubar> = {
  title: "Components/Menubar",
  component: Menubar,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
