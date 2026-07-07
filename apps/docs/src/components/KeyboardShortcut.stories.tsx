import type { Meta, StoryObj } from "@storybook/react";
import { KeyboardShortcut } from "@/components/ui/keyboard-shortcut";

const meta = {
  title: "Components/KeyboardShortcut",
  component: KeyboardShortcut,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof KeyboardShortcut>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { keys: ["⌘", "K"] },
};

export const ThreeKeys: Story = {
  args: { keys: ["⌘", "Shift", "P"] },
};
