import type { Meta, StoryObj } from "@storybook/react";
import { KeyboardShortcut } from "@/components/ui/keyboard-shortcut";

const meta = {
  title: "Components/KeyboardShortcut",
  component: KeyboardShortcut,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof KeyboardShortcut>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { keys: ["Ctrl", "K"] },
};

export const WithDescription: Story = {
  args: { keys: ["Ctrl", "K"], description: "Open command palette" },
};

export const SingleKey: Story = {
  args: { keys: ["Esc"], description: "Close dialog" },
};

export const MacShortcut: Story = {
  args: { keys: ["⌘", "Shift", "P"], description: "Open command palette" },
};

export const Vertical: Story = {
  args: {
    keys: ["Ctrl", "Alt", "Delete"],
    description: "Signal interrupt",
    layout: "vertical",
  },
};
