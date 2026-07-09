import type { Meta, StoryObj } from "@storybook/react";
import { KeyboardShortcut } from "@chaos_team/chaos-ui/ui";

const meta: Meta<typeof KeyboardShortcut> = {
  title: "Components/KeyboardShortcut",
  component: KeyboardShortcut,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { keys: ["⌘", "K"] },
};

export const ThreeKeys: Story = {
  args: { keys: ["⌘", "Shift", "P"] },
};
